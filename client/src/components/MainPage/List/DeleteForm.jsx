import React from 'react';
import {
  Button,
} from '@chakra-ui/react';

export default function DeleteForm({ el, handlerDeleteSpec }) {
  return (
    <Button
      colorScheme="teal"
      aria-label="Delete"
      data-specid={el?.id}
      onClick={handlerDeleteSpec}
    >
      Удалить
    </Button>
  );
}
