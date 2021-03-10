import { Heading, useToast } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { EditPlantForm } from '../../../components/EditPlantForm';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import {
  useEditPlantMutation,
  usePlantQuery
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
    return (
      <>
        <Navbar />
        <Layout mt={4} variant='regular'>
          <Heading>Edytuj roślinę</Heading>
          {!loading && (
            <EditPlantForm plantToEdit={data.plant}
            />
          )}
        </Layout>
      </>
    );
  }

  return <>coś poszło nie tak</>;
};

export default Edit;
