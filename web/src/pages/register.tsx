import { Button, Heading, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { Card } from '../components/Card';
import { FormField } from '../components/FormField';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toFormikErrorMap';

const Register: React.FC = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [register, {}] = useRegisterMutation({
    notifyOnNetworkStatusChange: true,
  });
  return (
    <>
      <Navbar />
      <Layout variant='regular'>
        <Card mt={10}>
          <Heading mb={10}>Rejestracja nowego konta</Heading>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: values,
                update: (cache) => {
                  cache.evict({ fieldName: 'me' });
                },
              });

              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else {
                toast({
                  title: 'Konto utworzone - gratulacje 🥳🥳🥳',
                  status: 'success',
                });
                router.push('/');
              }
            }}
          >
            {(props) => (
              <Form>
                <FormField
                  name='username'
                  isRequired
                  maxLength={20}
                  minLength={5}
                  placeholder='potezny_rośliniak_420'
                  label='Nazwa użytkownika'
                />
                <FormField
                  name='email'
                  isRequired
                  maxLength={50}
                  minLength={5}
                  placeholder='jak.kowalski@email.com'
                  label='Adres email'
                  type='email'
                />
                <FormField
                  name='password'
                  isRequired
                  maxLength={50}
                  minLength={5}
                  placeholder='SuperStr0ngP@ssword'
                  label='Hasło'
                  type='password'
                />
                <Button
                  mt={4}
                  colorScheme='green'
                  isLoading={props.isSubmitting}
                  type='submit'
                  mr={4}
                >
                  Rejestruj
                </Button>
                <Button
                  mt={4}
                  isLoading={props.isSubmitting}
                  onClick={() => router.push('/login')}
                >
                  Mam już konto
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Layout>
    </>
  );
};

export default Register;
