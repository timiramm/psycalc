import React from 'react';

import {
  Flex,
  Avatar,
  useColorModeValue,
  Stack,
  Text,
  Box,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ModalWindow from '../Modal/Modal';
import UserProfileEdit from './EditProfile';

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state?.user);

  return (
    <Flex
      height="100%"
      width="100%"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Box
          rounded="lg"
          width={300}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack
            spacing={4}
            alignItems="center"
          >
            <Box
              textAlign="center"
              position="relative"
              borderRadius="50% 50% 0 0"
              overflow="hidden"
            >
              <Avatar
                size="2xl"
                src={user?.avatar || '/img/defaultPic.png'}
              />
            </Box>
            <Text
              fontSize="3xl"
              as="b"
              textAlign="center"
            >
              {user?.name}
            </Text>
            <Text
              fontSize="2xl"
              textAlign="center"
            >
              {user?.email}
            </Text>
            <Button
              colorScheme="teal"
              onClick={onOpen}
            >
              Редактировать
            </Button>
          </Stack>
        </Box>
      </Stack>
      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        props={(
          <UserProfileEdit
            onClose={onClose}
          />
)}
      />
    </Flex>
  );
}
