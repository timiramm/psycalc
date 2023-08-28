import React from 'react';
import {
  Heading, Text, Button, Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      w="100%"
      h="100%"
      justifyContent="center"
      gap="20px"
      py={10}
      px={6}
    >
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Такой страницы не существует
      </Text>
      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={() => navigate('/')}
      >
        На Главную
      </Button>
    </Flex>
  );
}
