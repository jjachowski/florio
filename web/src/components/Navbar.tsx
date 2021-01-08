import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { NavbarActions } from './NavbarActions';
import { Searchbox } from './Searchbox';
import { Text } from '@chakra-ui/react';

export const Navbar: React.FC = ({}) => {
  return (
    <Box
      bg='green.600'
      h={14}
      boxShadow='sm'
      position='sticky'
      top={0}
      zIndex={1}
      p={2}
    >
      <Flex w='90%' m='auto'>
        <Box flex='1 1 0'>
          <Heading size='lg'>
            <NextLink href='/'>
              <Link>
                <Flex direction='row'>
                  <Text color='gray.800'>Flor.</Text>
                  <Text color='gray.300'>io</Text>
                </Flex>
              </Link>
            </NextLink>
          </Heading>
        </Box>
        <Box flex='1 1 0' textAlign='center'>
          <Searchbox />
        </Box>
        <Box flex='1 1 0'>
          <NavbarActions />
        </Box>
      </Flex>
    </Box>
  );
};
