import { AddIcon } from '@chakra-ui/icons';
import { Flex, Button } from '@chakra-ui/react';
import router, { useRouter } from 'next/router';
import React from 'react';

interface NavagationButtonsProps {}

export const NavagationButtons: React.FC<NavagationButtonsProps> = ({}) => {
  const router = useRouter();

  const isActive = (text: string): boolean => {
    return router.pathname === text;
  };

  return (
    <Flex direction='row' w='100%' justifyContent='space-between'>
      <Button
        colorScheme='yellow'
        // isActive={isActive('/')}
        variant={isActive('/') ? 'solid' : 'outline'}
        shadow='md'
        onClick={() => router.push('/')}
      >
        Ostatnio dodane
      </Button>
      <Button
        colorScheme='blue'
        shadow='md'
        variant={isActive('/fresh') ? 'solid' : 'outline'}
        onClick={() => router.push('/fresh')}
      >
        Edytowane i dodane rośliny
      </Button>
      <Button
        colorScheme='red'
        shadow='md'
        variant={isActive('/reported') ? 'solid' : 'outline'}
      >
        Zgłoszenia
      </Button>
      <Button
        colorScheme='green'
        shadow='md'
        variant={isActive('/plant/add') ? 'solid' : 'outline'}
        onClick={() => router.push('/plant/add')}
      >
        <AddIcon mr={2} />
        Dodaj nową roślinę :)
      </Button>
    </Flex>
  );
};
