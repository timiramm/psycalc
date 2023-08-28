import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';

export default function ModalWindow({ isOpen, onClose, props }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        alignSelf="center"
        m="10px"
        boxShadow="none"
      >
        <ModalBody
          alignItems="center"
          justifyContent="center"
        >
          {props}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
