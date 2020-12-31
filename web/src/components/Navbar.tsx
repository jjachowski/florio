import { Flex, Heading, Link, Box, Avatar, useToast } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { useApolloClient } from '@apollo/client';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const toast = useToast();
  const apollo = useApolloClient();
  return (
    <Flex
      h={14}
      bgColor="teal.500"
      align="center"
      position="sticky"
      top={0}
      zIndex={1}
      p={2}
    >
      <Heading size="lg">
        <NextLink href="/">
          <Link>Florea</Link>
        </NextLink>
      </Heading>
      {data?.me ? (
        <Flex ml="auto" justify="center" align="center">
          <Flex mr={4} align="center">
            <Avatar
              mr={2}
              size="sm"
              name={data.me.username}
              src="https://bit.ly/dan-abramov"
            />
            <Box mr={4} fontWeight="bold">
              {data?.me?.username}
            </Box>
            <Link
              onClick={async () => {
                const result = await logout();
                if (result) {
                  router.push('/');
                  apollo.resetStore();
                } else {
                  toast({ status: 'error', title: 'Nie udało się wylogować!' });
                }
              }}
              mr={4}
              fontWeight="bold"
            >
              wyloguj
            </Link>
          </Flex>
          <DarkModeSwitch />
        </Flex>
      ) : (
        <NextLink href="/login">
          <Link ml="auto" mr={4} fontWeight="bold">
            zaloguj
          </Link>
        </NextLink>
      )}
    </Flex>
  );
};
