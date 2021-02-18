import { Heading, useToast } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import {
  PlantFormInput,
  PlantFormValue,
  PlantForm,
} from '../../../components/PlantForm';
import {
  useEditPlantMutation,
  usePlantQuery,
} from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toFormikErrorMap';
import useGetIdFromRoute from '../../../utils/useGetIdFromRoute';

const Edit: React.FC = () => {
  const plantId = useGetIdFromRoute();
  const { data, loading } = usePlantQuery({
    variables: { id: plantId },
    notifyOnNetworkStatusChange: true,
  });
  const [editPlant] = useEditPlantMutation({
    notifyOnNetworkStatusChange: true,
  });
  const toast = useToast();
  const router = useRouter();

  if (!data || loading) {
    return <>loading...</>;
  }

  //   useEffect(() => {
  //     console.log(!!(data && data.plant));
  const onFormSubmit = async (
    plant: PlantFormValue,
    setErrors: (errors: FormikErrors<PlantFormInput>) => void
  ) => {
    const response = await editPlant({
      variables: {
        id: plantId,
        data: plant,
      },
    });

    if (response.data?.editPlant.errors) {
      setErrors(toErrorMap(response.data.editPlant.errors));
    } else {
      toast({
        title: 'Udało się! Dziękujemy 🥰',
        status: 'success',
      });
      router.back();
    }
  };

  if (data && data.plant) {
    const { description, imageUrl, primaryName, otherNames } = data.plant;

    const initialValues = {
      description,
      imageUrl,
      otherNames: otherNames.join(', '),
      primaryName,
    };

    return (
      <>
        <Navbar />
        <Layout mt={4} variant='regular'>
          <Heading>Edytuj roślinę</Heading>
          {!loading && (
            <PlantForm
              initialValues={initialValues}
              onFormSubmit={onFormSubmit}
            />
          )}
        </Layout>
      </>
    );
  }

  return <>coś poszło nie tak</>;
};

export default Edit;
