import { Box, Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { FormField } from '../components/FormField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toFormikErrorMap';

const Register: React.FC = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [register, {}] = useRegisterMutation({
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ variables: values });

        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else {
          console.log(response);
          toast({
            title: 'Konto utworzone - gratulacje 🥳🥳🥳',
            status: 'success',
          });
          router.push('/');
        }
      }}
    >
      {(props) => (
        <Box>
          <Form>
            <FormField
              name="username"
              isRequired
              placeholder="potezny_rośliniak_420"
              label="Nazwa użytkownika"
            />
            <FormField
              name="email"
              isRequired
              placeholder="jak.kowalski@email.com"
              label="Adres email"
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
        </Box>
      )}
    </Formik>
  );
};

export default Register;
