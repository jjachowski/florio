import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import { NavagationButtons } from '../components/NavagationButtons';
import { Navbar } from '../components/Navbar';
import { PlantCard } from '../components/PlantCard';
import { useTemporaryPlantsPreviewQuery } from '../generated/graphql';

interface FreshProps {}

const Fresh: React.FC<FreshProps> = ({}) => {
  const { data } = useTemporaryPlantsPreviewQuery();
  return (
    <>
      <Navbar />
      <Layout mt={8} variant='regular'>
        <VStack spacing={8}>
          <NavagationButtons />
          {data?.temporaryPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} isTemporary />
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Fresh;
