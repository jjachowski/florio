import { Box, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { FormField } from '../components/FormField';
import { Navbar } from '../components/Navbar';
import { useLoginMutation } from '../generated/graphql';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginMutation();
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ variables: values });
          console.log(response);
          if (response.data?.login.errors) {
            // should i mark the fields red and display field error?
            // setErrors({ usernameOrEmail: '', password: '' });
            // setErrors(toErrorMap(response.data.login.errors));
            toast({
              status: 'error',
              description: 'incorrect username or password',
            });
          } else {
            router.push('/');
          }
        }}
      >
        {(props) => (
          <Box>
            <Form>
              <FormField
                name="usernameOrEmail"
                isRequired
                placeholder="janusz kowalski"
                label="Nazwa użytkownika lub email"
              />
              <FormField
                name="password"
                isRequired
                placeholder="SuperStr0ngP@ssword"
                label="Hasło"
                type="password"
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                mr={4}
              >
                Zaloguj
              </Button>
              <Button
                mt={4}
                isLoading={props.isSubmitting}
                onClick={() => router.push('/register')}
              >
                Nie mam jeszcze konta
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default Login;
