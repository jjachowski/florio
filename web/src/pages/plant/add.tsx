import { Heading, useToast } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import {
  AddPlantForm,
  AddPlantFormInput,
  AddPlantFormValue,
} from '../../components/AddPlantForm';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { NavagationButtons } from '../../components/NavagationButtons';
import { Navbar } from '../../components/Navbar';
import { useAddPlantMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toFormikErrorMap';

const AddPlant: React.FC = ({}) => {
  const [addPlant] = useAddPlantMutation({
    notifyOnNetworkStatusChange: true,
  });
  const toast = useToast();
  const router = useRouter();

  const onFormSubmit = async (
    plant: AddPlantFormValue,
    setErrors: (errors: FormikErrors<AddPlantFormInput>) => void
  ) => {
    console.log('from add page: ', plant);
    const response = await addPlant({
      variables: {
        data: plant as any,
      },
    });

    console.log('add response: ', response);

    if (response.data?.addPlant.errors) {
      setErrors(toErrorMap(response.data.addPlant.errors));
    } else {
      toast({
        title: 'Udało się! Dziękujemy 🥰',
        status: 'success',
      });
      router.push('/');
    }
  };
  return (
    <>
      <Navbar />
      <Layout mt={8} variant='regular'>
        <NavagationButtons />
        <Card mt={8}>
          <Heading>Dodaj nową roślinę</Heading>
          <AddPlantForm onFormSubmit={onFormSubmit} />
        </Card>
      </Layout>
    </>
  );
};

export default AddPlant;
