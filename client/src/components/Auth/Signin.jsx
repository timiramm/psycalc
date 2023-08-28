import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SignIn({ handlerSwitch, handlerFormData, handlerSubmit }) {
  return (
    <Flex
      align="center"
      height="100%"
      width="100%"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Войти</Heading>
        </Stack>
        <Box
          rounded="lg"
          width={300}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input onChange={handlerFormData} name="email" type="email" placeholder="your-email@example.com" isRequired />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <Input onChange={handlerFormData} name="password" type="password" isRequired />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                colorScheme="teal"
                size="lg"
                onClick={handlerSubmit}
              >
                Войти
              </Button>
            </Stack>
            <Stack
              pt={6}
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Text align="center">
                Нет аккаунта?
              </Text>
              <Button size="sm" color="blue.400" name="signup" onClick={handlerSwitch}>Регистрация</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
