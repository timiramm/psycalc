require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs').promises;

const { User, Spec } = require('./db/models');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploadedAvatars');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const sessionConfig = {
  name: 'sid',
  store: new FileStore({}),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: false,
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.username = req.session?.user?.name;
  next();
});

app.use((req, res, next) => {
  console.log('\n\x1b[33m', 'req.session.user :', req.session?.user);
  next();
});

app.get('/', async (req, res) => {
  let specs = [];
  if (req.session.user) {
    try {
      specs = await Spec.findAll({
        where: { userId: req.session.user.id },
        order: [['id', 'ASC']],
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }
  res.json(req.session.user ? { user: req.session.user, specs } : null).end();
});

app.post('/', async (req, res) => {
  try {
    const newSpec = await Spec.create({ ...req.body });
    res.status(200).json(newSpec).end();
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json(error).end();
  }
});

app.delete('/', async (req, res) => {
  try {
    await Spec.destroy({ where: { ...req.body } });
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error).end();
  }
});

app.put('/', async (req, res) => {
  const {
    id, userId, title, hour,
  } = req.body;
  try {
    await Spec.update({ title, hour }, { where: { id, userId } });
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error).end();
  }
});

app.delete('/uploadAvatar', async (req, res) => {
  try {
    const { avatar: deletefile } = req.session.user;
    let deletepath;
    const url = 'http://localhost:3001/';
    const userId = req.session.user.id;
    if (deletefile) {
      deletepath = path.join(__dirname, '..', deletefile?.replace(url, ''));
      if (deletefile.slice(0, 5) === 'http:') {
        await fs.rm(deletepath);
      }
    }
    await User.update(
      { avatar: null },
      { where: { id: userId } },
    );
    req.session.user = {
      ...req.session.user,
      avatar: null,
    };
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error).end();
  }
});

app.post('/uploadAvatar', upload.single('avatar'), async (req, res) => {
  if (req.file) {
    const avatarPath = req.file.path;
    const userId = req.session.user.id;
    const url = 'http://localhost:3001/';
    try {
      const { avatar: deletefile } = req.session.user;
      let deletepath;
      await User.update(
        { avatar: url + avatarPath },
        { where: { id: userId } },
      );
      req.session.user = {
        ...req.session.user,
        avatar: url + avatarPath,
      };
      if (deletefile) {
        deletepath = path.join(__dirname, '..', deletefile?.replace(url, ''));
        if (deletefile.slice(0, 5) === 'http:') {
          await fs.rm(deletepath);
        }
      }
      res.json({ user: req.session.user });
    } catch (error) {
      console.log('Ошибка при сохранении пути к аватару:', error);
      res.status(500).send('Ошибка при загрузке аватара');
    }
  } else {
    res.status(400).send('Ошибка при загрузке аватара');
  }
});

app.put('/auth', async (req, res) => {
  const {
    id, name, email, password,
  } = req.body;
  try {
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.update({
        name, email, password: hashPassword,
      }, { where: { id } });
      res.status(200).end();
    } else {
      await User.update({
        name, email,
      }, { where: { id } });
      res.status(200).end();
    }
  } catch (error) {
    res.status(401).json(error).end();
  }
});

app.post('/auth', async (req, res) => {
  const {
    name, email, password, authCommand,
  } = req.body;

  try {
    switch (authCommand) {
      case 'signup':
        { const hashPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            name, email, password: hashPassword,
          });

          req.session.user = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
          };
          req.session.save();
          res.status(200).json({ user: req.session.user, specs: null }).end(); }
        break;
      case 'signin':
        {
          const logUser = await User.findOne({
            where: { email },
          });

          const comparedPassword = await bcrypt.compare(password, logUser.password);

          if (comparedPassword) {
            req.session.user = {
              id: logUser.id,
              name: logUser.name,
              email: logUser.email,
              avatar: logUser.avatar,
            };
            const specs = await Spec.findAll({
              where: { userId: req.session.user.id },
              order: [['id', 'ASC']],
            });
            req.session.save();
            res.status(200).json({ user: req.session.user, specs }).end();
          } }
        break;
      case 'logout':
        req.session.destroy((err) => {
          if (err) res.json(err);
          res.clearCookie('sid');
          res.end();
        });
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(401).json(error).end();
  }
});

app.listen(process.env.PORT, () => console.log(`         Server up on ${process.env.PORT} port         `));
