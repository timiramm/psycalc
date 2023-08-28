import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignUp({ handlerSwitch, handlerFormData, handlerSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      align="center"
      justify="center"
      height="100%"
      width="100%"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Регистрация
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          width={300}
          height="auto"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Логин</FormLabel>
              <Input onChange={handlerFormData} type="text" name="name" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input onChange={handlerFormData} type="email" name="email" placeholder="your-email@example.com" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Пароль</FormLabel>
              <InputGroup>
                <Input onChange={handlerFormData} type={showPassword ? 'text' : 'password'} name="password" />
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                colorScheme="teal"
                onClick={handlerSubmit}
              >
                Зарегистироваться
              </Button>
            </Stack>
            <Stack
              pt={6}
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Text align="center">
                Есть аккаунт?
              </Text>
              <Button
                color="blue.400"
                name="signin"
                onClick={handlerSwitch}
                size="sm"
              >
                Войти
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
