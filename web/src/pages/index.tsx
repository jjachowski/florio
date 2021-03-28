import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../components/Layout';
import { NavagationButtons } from '../components/NavagationButtons';
import { Navbar } from '../components/Navbar';
import { PlantCard } from '../components/PlantCard';
import { usePlantsPreviewQuery } from '../generated/graphql';
const Index = () => {
  const { data } = usePlantsPreviewQuery();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Layout mt={8} variant='regular'>
        <VStack spacing={8}>
          <NavagationButtons />

          {data?.plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Index;
