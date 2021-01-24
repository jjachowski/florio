import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import {
  AddPlantForm,
  AddPlantFormInput,
  AddPlantFormValue,
} from '../../components/AddPlantForm';
import { FormField } from '../../components/FormField';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';
import {
  PlantForm,
  PlantFormInput,
  PlantFormValue,
} from '../../components/PlantForm';
import { useAddPlantMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toFormikErrorMap';

const AddPlant: React.FC = ({}) => {
  const [addPlant, { loading }] = useAddPlantMutation({
    notifyOnNetworkStatusChange: true,
  });
  const toast = useToast();
  const router = useRouter();
  const initialValues: AddPlantFormInput = {
    primaryName: '',
    otherNames: '',
    description: '',
  };

  const onFormSubmit = async (
    plant: AddPlantFormValue,
    setErrors: (errors: FormikErrors<AddPlantFormInput>) => void
  ) => {
    console.log(plant);

    // const response = await addPlant({
    //   variables: {
    //     data: plant,
    //   },
    // });

    // if (response.data?.addPlant.errors) {
    //   setErrors(toErrorMap(response.data.addPlant.errors));
    // } else {
    //   toast({
    //     title: 'Udało się! Dziękujemy 🥰',
    //     status: 'success',
    //   });
    //   router.push('/');
    // }
  };
  return (
    <>
      <Navbar />
      <Layout mt={4} variant='regular'>
        <Heading>Dodaj nową roślinę</Heading>
        <AddPlantForm
          initialValues={initialValues}
          onFormSubmit={onFormSubmit}
        />
        {/* <PlantForm initialValues={initialValues} onFormSubmit={onFormSubmit} /> */}
      </Layout>
    </>
  );
};

export default AddPlant;
