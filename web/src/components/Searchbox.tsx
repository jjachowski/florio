import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Kbd,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import ReactShortcut from 'react-shortcut';

interface SearchboxProps {}

export const Searchbox: React.FC<SearchboxProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shortcuts = ['command+k', 'ctrl+k'];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Input placeholder="zacznij wpisywać nazwę rośliny..." />
        </ModalContent>
      </Modal>
      <ReactShortcut keys={shortcuts} onKeysPressed={onOpen} />
      <Button boxShadow="sm" onClick={onOpen} w="20rem">
        <Flex justifyContent="space-between" align="center" w="100%">
          <SearchIcon />
          szukaj
          <span>
            <Kbd>cmd</Kbd>/<Kbd>ctrl</Kbd>+<Kbd>K</Kbd>
          </span>
        </Flex>
      </Button>
    </>
  );
};
