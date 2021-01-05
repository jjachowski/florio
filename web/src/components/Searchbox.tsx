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
  Box,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactShortcut from 'react-shortcut';
import { usePlantNamesQuery } from '../generated/graphql';

interface SearchboxProps {}

export const Searchbox: React.FC<SearchboxProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = usePlantNamesQuery();
  const [searchText, setSearchText] = useState('');
  const shortcuts = ['command+k', 'ctrl+k'];

  const [autocomplete, setAutocomplete] = useState({
    selectedText: '',
    filteredNames:
      data?.plantNames.map((pn) => ({
        name: pn.name,
        plantId: pn.plantId,
      })) ?? [],
  });

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    setAutocomplete({
      ...autocomplete,
      selectedText: autocomplete.filteredNames[0]?.name,
      filteredNames:
        data?.plantNames
          .filter((pn) =>
            pn.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((pn) => ({
            name: pn.name,
            plantId: pn.plantId,
          })) ?? [],
    });
  }, [searchText]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let newSelectedText = '';
    let currentIndex = 0;

    switch (event.key) {
      case 'ArrowDown':
        currentIndex = autocomplete.filteredNames.findIndex(
          (n) => n.name === autocomplete.selectedText
        );
        if (currentIndex - 1 === autocomplete.filteredNames.length) {
          newSelectedText = autocomplete.filteredNames[0].name;
        } else {
          newSelectedText = autocomplete.filteredNames[currentIndex + 1].name;
        }
        setAutocomplete({ ...autocomplete, selectedText: newSelectedText });
        break;
      case 'ArrowUp':
        currentIndex = autocomplete.filteredNames.findIndex(
          (n) => n.name === autocomplete.selectedText
        );
        if (currentIndex === 0) {
          newSelectedText =
            autocomplete.filteredNames[autocomplete.filteredNames.length - 1]
              .name;
        } else {
          newSelectedText = autocomplete.filteredNames[currentIndex - 1].name;
        }
        setAutocomplete({ ...autocomplete, selectedText: newSelectedText });

        break;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Input
            value={searchText}
            onKeyUp={handleKeyUp}
            onChange={handleSearchTextChange}
            placeholder='zacznij wpisywać nazwę rośliny...'
          />
          {searchText.length > 2 && (
            <VStack maxH='15rem' overflow='auto' spacing={2}>
              {autocomplete.filteredNames?.map((plantName) => (
                <Box
                  bg={
                    autocomplete.selectedText === plantName.name
                      ? 'red.100'
                      : 'blue.100'
                  }
                  key={plantName.name}
                >
                  {plantName.name}
                </Box>
              ))}
            </VStack>
          )}
        </ModalContent>
      </Modal>
      <ReactShortcut keys={shortcuts} onKeysPressed={onOpen} />
      <Button boxShadow='sm' onClick={onOpen} w='20rem'>
        <Flex justifyContent='space-between' align='center' w='100%'>
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
