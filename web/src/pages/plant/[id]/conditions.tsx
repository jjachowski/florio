import { Box, Button, Flex, Heading, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { FormField } from '../../../components/FormField';
import { FormSelectField } from '../../../components/FormSelectField';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import {
  OptimalConditionsInput,
  useAddOptimalConditionsMutation,
} from '../../../generated/graphql';
import {
  amountSelectOptions,
  seasonSelectOptions,
} from '../../../utils/seasonConditionsHelpers';
import { toErrorMap } from '../../../utils/toFormikErrorMap';
import useGetIdFromRoute from '../../../utils/useGetIdFromRoute';

interface ConditionsProps {}

const Conditions: React.FC<ConditionsProps> = ({}) => {
  const [addOptimalConditions] = useAddOptimalConditionsMutation();
  const plantId = useGetIdFromRoute();
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Layout mt={4} variant='regular'>
        <Heading>Dodaj optymalne warunki dla rośliny</Heading>
        <Box mb={6} color='gray.500'>
          Jeżeli roślina posiada optymalne warunki dla wybranej pory roku
          zostaną one nadpisane!
        </Box>
        <Formik
          initialValues={{
            season: 0,
            water: 0,
            sun: 0,
            airHumidityLow: 0,
            airHumidityHigh: 0,
            temperatureLow: 0,
            temperatureHigh: 0,
          }}
          onSubmit={async (values, { setErrors }) => {
            const parsedValues: { [k: string]: number } = {};
            Object.entries(values).forEach(([key, value]) => {
              parsedValues[key] = parseInt(value.toString());
            });

            const response = await addOptimalConditions({
              variables: {
                plantId,
                data: {
                  ...(parsedValues as OptimalConditionsInput),
                },
              },
              update: (cache) => {
                cache.evict({
                  id: 'Plant:' + plantId,
                });
              },
            });

            if (response.data?.addOptimalConditions.errors) {
              setErrors(toErrorMap(response.data.addOptimalConditions.errors));
            } else {
              toast({
                title: 'Udało się! Dziękujemy 🥰',
                status: 'success',
              });
              router.push('/plant/' + plantId);
            }
          }}
        >
          {(props) => (
            <Box>
              <Form>
                <VStack spacing={4}>
                  <FormSelectField
                    name='season'
                    isRequired
                    placeholder='Wybierz porę roku'
                    label='Pora roku'
                    options={seasonSelectOptions}
                  />
                  <FormSelectField
                    name='water'
                    isRequired
                    placeholder='Wybierz ilość'
                    label='Zapotrzebowanie na wodę'
                    options={amountSelectOptions}
                  />
                  <FormSelectField
                    name='sun'
                    isRequired
                    placeholder='Wybierz ilość'
                    label='Zapotrzebowanie na słońce'
                    options={amountSelectOptions}
                  />
                  <Flex direction={{ base: 'column', sm: 'row' }} w='full'>
                    <FormField
                      name='airHumidityLow'
                      isRequired
                      placeholder='np. 50'
                      type='number'
                      label='Min. wilgotność powietrza'
                    />
                    <FormField
                      name='airHumidityHigh'
                      isRequired
                      placeholder='np. 50'
                      type='number'
                      label='Max. wilgotność powietrza'
                    />
                  </Flex>
                  <Flex direction={{ base: 'column', md: 'row' }} w='full'>
                    <FormField
                      name='temperatureLow'
                      isRequired
                      placeholder='np. 18'
                      type='number'
                      label='Minimalna temperatura powietrza (w °C)'
                    />
                    <FormField
                      name='temperatureHigh'
                      isRequired
                      placeholder='np. 30'
                      type='number'
                      label='Maksymalna temperatura powietrza (w °C)'
                    />
                  </Flex>
                </VStack>

                <Button
                  mt={4}
                  colorScheme='green'
                  isLoading={props.isSubmitting}
                  disabled={!props.isValid}
                  type='submit'
                  mr={4}
                >
                  Dodaj
                </Button>
                <Button
                  mt={4}
                  isLoading={props.isSubmitting}
                  colorScheme='red'
                  type='reset'
                >
                  Chcę zacząć on nowa
                </Button>
              </Form>
            </Box>
          )}
        </Formik>
      </Layout>
    </>
  );
};

export default Conditions;
