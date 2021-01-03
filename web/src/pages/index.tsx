import { VStack } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { PlantCard } from '../components/PlantCard';
import { usePlantsQuery } from '../generated/graphql';
const Index = () => {
  const { data } = usePlantsQuery();

  return (
    <>
      <Navbar />
      <Layout mt={16} variant="regular">
        <VStack spacing={8}>
          {data?.plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Index;
