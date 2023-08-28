import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import SignUp from '../Auth/Signup';
import SignIn from '../Auth/Signin';

export default function StarterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [switchState, setSwitchState] = useState(false);
  const [switchStart, setSwitchStart] = useState(true);
  const [formData, setFormData] = useState({});
  const [authCommand, setAuthCommand] = useState('signin');

  const handlerSwitch = (event) => {
    setSwitchState((prevState) => !prevState);
    setAuthCommand(event.target.name);
    setFormData({});
  };

  const handlerFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (formData.email.match(emailValidation)) {
      const response = fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, authCommand }),
        credentials: 'include',
      });
      response
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          navigate('/');
          dispatch({ type: 'USER', payload: data.user });
          dispatch({ type: 'SPECS', payload: data.specs });
        })
        .catch((error) => console.log(error));
    } else {
      console.log('Неверный формат email');
    }
  };

  return (
    <Stack h="90%" direction={{ base: 'column', md: 'row' }}>
      { switchStart ? (
        <>
          <Flex p={8} flex={1} align="center" justify="center">
            <Stack spacing={6} w="full" maxW="lg">
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as="span"
                  position="relative"
                  _after={{
                    content: "''",
                    width: 'full',
                    height: '20%',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'teal',
                    zIndex: -1,
                  }}
                >
                  Всегда
                </Text>
                <br />
                {' '}
                <Text color="teal" as="span">
                  под рукой
                </Text>
                {' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
                Простой и удобный инструмент для подсчета часов с сертификатов
              </Text>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  rounded="full"
                  colorScheme="teal"
                  onClick={() => setSwitchStart(false)}
                  size="lg"
                >
                  Начать
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex
            flex={1}
            justifyContent="center"
            alignItems="center"
            position="relative"
            h={{ base: '50%', md: '100%' }}
            padding={{ base: '0px', md: '32px 32px 32px 0px' }}
          >
            <Image
              alt="Start Image"
              objectFit="cover"
              maxHeight="100%"
              rounded="30px"
              h="auto"
              src="/img/startImg.png"
            />
            <Icon
              viewBox="0 0 578 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              w="100%"
              h="100%"
              position="absolute"
              left={0}
              zIndex={-1}
              color="teal"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
              />
            </Icon>
          </Flex>
        </>
      )
        : (
          <Box
            width="100%"
            height="100%"
          >
            { switchState
              ? (
                <SignUp
                  handlerSwitch={handlerSwitch}
                  handlerFormData={handlerFormData}
                  handlerSubmit={handlerSubmit}
                />
              )
              : (
                <SignIn
                  handlerSwitch={handlerSwitch}
                  handlerFormData={handlerFormData}
                  handlerSubmit={handlerSubmit}
                />
              )}
          </Box>
        )}
    </Stack>
  );
}
