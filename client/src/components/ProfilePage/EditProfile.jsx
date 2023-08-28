import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function UserProfileEdit({ onClose }) {
  const inputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const handlerAvatarEdit = async (event) => {
    const file = event.target.files[0];
    const inputData = new FormData();
    inputData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:3001/uploadAvatar', {
        method: 'POST',
        body: inputData,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        dispatch({ type: 'USER', payload: result.user });
      } else {
        console.log('Ошибка при загрузке аватара');
      }
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  const handlerOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log('formData: ', formData);
  };

  const handlerDeleteAvatar = () => {
    if (user?.avatar) {
      const response = fetch('http://localhost:3001/uploadAvatar', {
        method: 'DELETE',
        credentials: 'include',
      });

      response
        .then((res) => {
          if (res.status === 200) {
            dispatch({ type: 'USER', payload: { ...user, avatar: null } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlerCancel = () => {
    setFormData({});
    onClose();
  };

  const handlerSubmit = () => {
    const response = fetch('http://localhost:3001/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: user.id }),
      credentials: 'include',
    });
    response
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'USER', payload: { ...user, ...formData } });
          onClose();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue('white', 'gray.700')}
        p="16px 0px"
      >

        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={user?.avatar || '/img/defaultPic.png'}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={handlerDeleteAvatar}
                />
              </Avatar>
              <Input
                name="avatar"
                id="avatar"
                type="file"
                ref={inputRef}
                accept="image/*"
                display="none"
                onChange={handlerAvatarEdit}
              />
            </Center>
            <Center w="full">
              <Button
                w="full"
                onClick={() => inputRef.current.click()}
              >
                Заменить аватар
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName">
          <FormLabel>Логин</FormLabel>
          <Input
            name="name"
            placeholder="Новый логин"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={handlerOnChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            onChange={handlerOnChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Пароль</FormLabel>
          <InputGroup>
            <Input
              name="password"
              placeholder="Новый пароль"
              _placeholder={{ color: 'gray.500' }}
              type={showPassword ? 'text' : 'password'}
              onChange={handlerOnChange}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={4} direction={['column', 'row']}>
          <Button
            bg="red.400"
            color="white"
            w="full"
            onClick={handlerCancel}
            _hover={{
              bg: 'red.500',
            }}
          >
            Закрыть
          </Button>
          <Button
            onClick={handlerSubmit}
            colorScheme="teal"
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Принять
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
