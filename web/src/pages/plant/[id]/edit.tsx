import { Heading, useToast } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { EditPlantForm } from '../../../components/EditPlantForm';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import {
  useEditPlantMutation,
  usePlantQuery,
} from '../../../generated/graphql';
import useGetIdFromRoute from '../../../utils/useGetIdFromRoute';

const Edit: React.FC = () => {
  const plantId = useGetIdFromRoute();
  const { data, loading } = usePlantQuery({
    variables: { id: plantId },
    notifyOnNetworkStatusChange: true,
  });

  if (!data || loading) {
    return <>loading...</>;
  }

  return (
    <>
      <Navbar />
      <Layout mt={4} variant='regular'>
        <Heading>Edytuj roślinę</Heading>
        {!loading && data && data.plant && (
          <EditPlantForm plantToEdit={data.plant} />
        )}
      </Layout>
    </>
  );
};

export default Edit;
