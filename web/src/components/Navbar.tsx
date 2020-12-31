import { Flex, Heading, Link, Box } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { DarkModeSwitch } from './DarkModeSwitch';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex
      bgColor="teal.500"
      position="sticky"
      top={0}
      zIndex={1}
      p={3}
      justify="center"
    >
      <Heading size="md">
        <NextLink href="/">
          <Link color="white">Florea</Link>
        </NextLink>
      </Heading>
      <Flex ml="auto" justify="center" height="100%">
        <DarkModeSwitch />
      </Flex>
    </Flex>
  );
};
