import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { FormField } from '../../components/FormField';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';
import { useAddPlantMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toFormikErrorMap';

const AddPlant: React.FC = ({}) => {
  const [addPlant, { loading }] = useAddPlantMutation({
    notifyOnNetworkStatusChange: true,
  });
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Layout mt={4} variant='regular'>
        <Heading>Dodaj roślinę</Heading>
        <Formik
          initialValues={{
            primaryName: '',
            otherNames: '',
            description: '',
            imageUrl: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const { primaryName, description, imageUrl } = values;
            const plant = {
              primaryName,
              description,
              imageUrl,
              otherNames: values.otherNames.split(',').map((n) => n.trim()),
              optimalConditions: [],
            };
            const response = await addPlant({
              variables: {
                data: plant,
              },
            });

            if (response.data?.addPlant.errors) {
              setErrors(toErrorMap(response.data.addPlant.errors));
            } else {
              console.log(response);
              toast({
                title: 'Udało się! Dziękujemy 🥰',
                status: 'success',
              });
              router.push('/');
            }
          }}
        >
          {(props) => (
            <Box>
              <Form>
                <VStack spacing={4}>
                  <FormField
                    name='primaryName'
                    isRequired
                    placeholder='Maranta Fascinator'
                    label='Nazwa rośliny'
                  />
                  <FormField
                    name='otherNames'
                    placeholder='Fascinator Tricolor'
                    label='Pozostałe nazwy (oddziel przecinkiem)'
                  />
                  <FormField
                    name='description'
                    isRequired
                    placeholder='Odmiana Fascinator Tricolor jest...'
                    label='Opis'
                  />
                  <FormField
                    name='imageUrl'
                    isRequired
                    placeholder='https://zielony-parapet ... .jpg'
                    label='Link do grafiki'
                  />
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

export default AddPlant;
