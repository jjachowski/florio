import { Heading, toast, Box, VStack, Button, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { FormField } from '../../../components/FormField';
import {
  FormSelectField,
  SelectOption,
} from '../../../components/FormSelectField';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import { toErrorMap } from '../../../utils/toFormikErrorMap';
import {
  seasonSelectOptions,
  amountSelectOptions,
} from '../../../utils/seasonConditionsHelpers';
import { useAddOptimalConditionsMutation } from '../../../generated/graphql';
import useGetIntId from '../../../utils/useGetIntId';

interface ConditionsProps {}

const Conditions: React.FC<ConditionsProps> = ({}) => {
  const [addOptimalConditions] = useAddOptimalConditionsMutation();
  const plantId = useGetIntId();
  // const [addPlant, { loading }] = useAddPlantMutation({
  //     notifyOnNetworkStatusChange: true,
  //   });
  //   const toast = useToast();
  //   const router = useRouter()
  return (
    <>
      <Navbar />
      <Layout mt={4} variant='regular'>
        <Heading>Dodaj optymalne warunki dla rośliny</Heading>
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
            const { season } = values;
            const response = await addOptimalConditions({
              variables: {
                plantId,
                data: {
                  ...values,
                },
              },
            });

            // const response = await addPlant({
            //   variables: {
            //     data: plant,
            //   },
            // });

            // if (response.data?.addPlant.errors) {
            //   setErrors(toErrorMap(response.data.addPlant.errors));
            // } else {
            //   console.log(response);
            //   toast({
            //     title: 'Udało się! Dziękujemy 🥰',
            //     status: 'success',
            //   });
            //   router.push('/');
            // }
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
                  <Flex direction={{ base: 'column', md: 'row' }} w='full'>
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
