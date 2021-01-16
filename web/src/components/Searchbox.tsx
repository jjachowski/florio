import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  Kbd,
  List,
  ListItem,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactShortcut from 'react-shortcut';
import { usePlantNamesQuery } from '../generated/graphql';

interface SearchboxProps {}

export const Searchbox: React.FC<SearchboxProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = usePlantNamesQuery();
  const [searchText, setSearchText] = useState('');
  const shortcuts = ['command+k', 'ctrl+k'];
  const router = useRouter();

  const [autocomplete, setAutocomplete] = useState<{
    selectedText: string;
    filteredNames: {
      name: string;
      plantId: number;
      ref: React.RefObject<any> | null;
    }[];
  }>({
    selectedText: '',
    filteredNames:
      data?.plantNames.map((pn) => ({
        name: pn.name,
        plantId: pn.plantId,
        ref: null,
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
            ref: React.createRef(),
          })) ?? [],
    });
  }, [searchText]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentIndex = autocomplete.filteredNames.findIndex(
      (n) => n.name === autocomplete.selectedText
    );

    switch (event.key) {
      case 'Enter':
        router.push(
          '/plant/' +
            autocomplete.filteredNames.find(
              (n) => n.name === autocomplete.selectedText
            )?.plantId
        );
        onClose();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < autocomplete.filteredNames.length - 1) {
          setAutocomplete({
            ...autocomplete,
            selectedText: autocomplete.filteredNames[currentIndex + 1].name,
          });
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          setAutocomplete({
            ...autocomplete,
            selectedText: autocomplete.filteredNames[currentIndex - 1].name,
          });
        }
        break;
    }

    const itemtoScrollIntoView = autocomplete.filteredNames.find(
      (f) => f.name === autocomplete.selectedText
    );

    if (itemtoScrollIntoView) {
      (itemtoScrollIntoView.ref as any).current?.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent overflow='hidden'>
          <Input
            value={searchText}
            onKeyDown={handleKeyUp}
            onChange={handleSearchTextChange}
            roundedBottom={0}
            placeholder='zacznij wpisywać nazwę rośliny...'
          />
          {
            <List maxH='15rem' overflow='auto'>
              {autocomplete.filteredNames?.map((plantName) => (
                <ListItem
                  w='100%'
                  textAlign='center'
                  py='1rem'
                  bg={
                    autocomplete.selectedText === plantName.name
                      ? 'green.500'
                      : 'none'
                  }
                  boxShadow={
                    autocomplete.selectedText === plantName.name
                      ? '2xl'
                      : 'none'
                  }
                  key={plantName.name}
                  ref={plantName.ref}
                  onClick={() => {
                    router.push('/plant/' + plantName.plantId);
                    onClose();
                  }}
                  onMouseEnter={() =>
                    setAutocomplete({
                      ...autocomplete,
                      selectedText: plantName.name,
                    })
                  }
                >
                  {plantName.name}
                </ListItem>
              ))}
            </List>
          }
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
