import React from 'react';
import {
  Flex,
  Stack,
  Text,
  Input,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function Form({ specEl, handlerEditHour }) {
  return (
    <Flex
      flexDirection="column"
      gap="20px"
    >
      <Stack
        spacing={4}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        className="hourInput"
      >
        <Text
          as="b"
          fontSize="20px"
        >
          {specEl?.hour}
        </Text>
        <AddIcon />
        <Input
          className="hour"
          width="80px"
          px="0px"
          textAlign="center"
          variant="solid"
          borderWidth={1}
          _placeholder={{
            color: 'gray.400',
          }}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          name="hour"
          type="number"
          required
          placeholder="Часы"
        />
      </Stack>
      <Button
        variant="outline"
        onClick={handlerEditHour}
        data-specid={specEl?.id}
        data-spechour={specEl?.hour}
      >
        Принять
      </Button>
    </Flex>
  );
}
