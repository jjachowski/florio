import { Box, Heading } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { usePlantsQuery } from '../generated/graphql';
const Index = () => {
  const { data } = usePlantsQuery();
  console.log(data?.plants);

  return (
    <>
      <Navbar />
      {data?.plants.map((plant) => {
        return (
          <Box boxShadow="xl" mt={4} mx={4} p={4} rounded={12} key={plant.id}>
            <Heading>{plant.names.find((n) => n.isPrimary)?.name}</Heading>
            <p>{plant.description}</p>
            <p>
              other names:{' '}
              {plant.names
                .filter((n) => !n.isPrimary)
                .map((n) => n.name)
                .join(', ')}
            </p>
          </Box>
        );
      })}
    </>
  );
};

export default Index;
