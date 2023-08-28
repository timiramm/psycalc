import React from 'react';

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlerLogOut = () => {
    const response = fetch('http://localhost:3001/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authCommand: 'logout' }),
      credentials: 'include',
    });
    response
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'USER', payload: null });
          dispatch({ type: 'SPECS', payload: null });
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      width="100%"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box
          fontWeight={800}
          fontSize={20}
        >
          <Button
            onClick={() => navigate('/')}
            background="none"
            fontSize="20px"
            p="0px"
          >
            Зачетная книжка
          </Button>
        </Box>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Button
              onClick={toggleColorMode}
              background="none"
              p="0px"
            >
              {colorMode === 'light'
                ? <MoonIcon />
                : <SunIcon boxSize={5} />}
            </Button>
            {user
              && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar
                    size="sm"
                    src={user?.avatar || '/img/defaultPic.png'}
                  />
                </MenuButton>
                <MenuList alignItems="center">
                  <Center>
                    <Text as="b" m="5px">{user?.name}</Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => navigate('/profile')}
                  >
                    <Text>
                      Профиль
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onClick={handlerLogOut}
                  >
                    <Text>
                      Выйти
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
              )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
