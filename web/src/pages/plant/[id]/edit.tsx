import { Heading } from '@chakra-ui/react';
import React from 'react';
import { EditPlantForm } from '../../../components/EditPlantForm';
import { Layout } from '../../../components/Layout';
import { Navbar } from '../../../components/Navbar';
import { usePlantQuery } from '../../../generated/graphql';
import useGetIdFromRoute from '../../../utils/useGetIdFromRoute';

const Edit: React.FC = () => {
  const plantId = useGetIdFromRoute();
  const { data, loading } = usePlantQuery({
    variables: { id: plantId },
    notifyOnNetworkStatusChange: true,
  });

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
