import React from 'react';
import {
  FocusLock,
  useDisclosure,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
} from '@chakra-ui/react';

export default function PopoverForm({ props, propIcon }) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="auto"
      closeOnBlur
    >
      <PopoverTrigger>
        <IconButton colorScheme="teal" size="md" icon={propIcon} />
      </PopoverTrigger>
      <PopoverContent
        p={5}
        width="200px"
      >
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          {props}
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
}
