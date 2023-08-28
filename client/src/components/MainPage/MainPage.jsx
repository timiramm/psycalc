import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  useColorModeValue,
  Input,
  Button,
  Text,
  Stack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ListComp from './List/List';

export default function MainPage() {
  const [spec, setSpec] = useState();
  const dispatch = useDispatch();
  const allSpec = useSelector((state) => state.specs);
  const user = useSelector((state) => state.user);

  const handlerChange = (event) => {
    setSpec({ ...spec, [event.target.name]: event.target.value });
  };

  const handlerSubmitAdd = (event) => {
    event.preventDefault();
    const response = fetch('http://localhost:3001', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, ...spec }),
      credentials: 'include',
    });
    response
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          const allSpecPlusOne = allSpec ? [...allSpec, data] : [data];
          dispatch({ type: 'SPECS', payload: allSpecPlusOne });
          event.target.reset();
          setSpec();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="center"
      flexDirection="column"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <form
        id="formSpec"
        onSubmit={handlerSubmitAdd}
      >
        <Input
          variant="solid"
          borderWidth={1}
          _placeholder={{
            color: 'gray.400',
          }}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          id="title"
          name="title"
          type="text"
          required
          placeholder="Название"
          onChange={handlerChange}
        />
        <Input
          width="80px"
          px="0px"
          textAlign="center"
          variant="solid"
          borderWidth={1}
          _placeholder={{
            color: 'gray.400',
          }}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          id="hour"
          name="hour"
          type="number"
          required
          placeholder="Часы"
          onChange={handlerChange}
        />
        <Button
          width="40px"
          colorScheme="teal"
          type="submit"
        >
          <AddIcon />
        </Button>
      </form>
      {allSpec?.length > 0
        ? <ListComp />
        : (
          <Stack
            mt={40}
          >
            <Text
              fontSize="md"
              textAlign="center"
            >
              Добавьте данные из сертификата
            </Text>
          </Stack>
        )}
    </Flex>
  );
}
