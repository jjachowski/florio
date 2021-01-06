import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';

const AddPlant: React.FC = ({}) => {
  return (
    <>
      <Navbar />
      <Layout variant='regular'>
        <Heading>add plant</Heading>
      </Layout>
    </>
  );
};

export default AddPlant;
