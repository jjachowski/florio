import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Flex, Link, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';

interface NavbarActionsProps {}

export const NavbarActions: React.FC<NavbarActionsProps> = ({}) => {
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const toast = useToast();
  const apollo = useApolloClient();

  return (
    <Flex justify="center" align="center">
      {data?.me ? (
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
                toast({
                  status: 'error',
                  title: 'Nie udało się wylogować!',
                });
              }
            }}
            mr={4}
            fontWeight="bold"
          >
            wyloguj
          </Link>
        </Flex>
      ) : (
        <NextLink href="/login">
          <Link mr={4} fontWeight="bold">
            zaloguj
          </Link>
        </NextLink>
      )}
      <DarkModeSwitch />
    </Flex>
  );
};
