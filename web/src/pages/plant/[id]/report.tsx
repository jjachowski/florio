import { Box, Button, Flex, Heading, Link, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React from 'react';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import {
  usePlantQuery,
  useReportPlantMutation,
} from '../../../generated/graphql';
import { isServer } from '../../../utils/isServer';
import useGetIdFromRoute from '../../../utils/useGetIdFromRoute';
import { Form, Formik } from 'formik';
import { FormField } from '../../../components/FormField';

const Report: React.FC = ({}) => {
  const plantId = useGetIdFromRoute();
  const toast = useToast();
  const router = useRouter();
  const [reportPlant] = useReportPlantMutation();
  const { data } = usePlantQuery({
    variables: { id: plantId },
    skip: isServer(),
  });

  if (!data?.plant) {
    return (
      <>
        <Navbar />
        <Layout mt={4} variant='regular'>
          <Heading>Nie znaleziono rośliny</Heading>
          <NextLink href='/'>
            <Link>Powrót do strony głównej</Link>
          </NextLink>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Layout mt={4} variant='regular'>
        <Flex direction='row' fontSize='2xl'>
          <Box mr={2}>Zgłoś roślinę:</Box>
          <Box textDecor='underline'>{data?.plant?.primaryName}</Box>
        </Flex>
        <Box mb={4} color='gray.400' fontSize='sm'>
          Bezpodstawne zgłoszenie spowoduje spadek Twojej karmy
        </Box>
        <Formik
          initialValues={{ reason: '' }}
          onSubmit={async ({ reason }) => {
            const result = await reportPlant({
              variables: { plantId, reason },
              update: (cache) => {
                if (data.plant) {
                  cache.evict({ id: cache.identify(data.plant) });
                }
              },
            });
            if (result) {
              toast({
                title: 'Przyjęliśmy Twoje zgłoszenie, dziękujemy',
                status: 'success',
              });
              router.push('/');
            } else {
              toast({
                title: 'Coś poszło nie tak - ogarnij zwracanie błędów',
                status: 'error',
              });
            }
          }}
        >
          {() => (
            <Form>
              <FormField
                isTextArea
                label='Powód zgłoszenia'
                name='reason'
                placeholder='Asd...'
              />
              <Button type='submit'>Wyślij</Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};
export default Report;
