import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';
import { OptimalConditions } from '../../components/plantDetails/OptimalConditions';
import { PlantBasics } from '../../components/plantDetails/PlantBasics';
import { PlantGallery } from '../../components/PlantGallery';
import { useTemporaryPlantQuery } from '../../generated/graphql';
import useGetIdFromRoute from '../../utils/useGetIdFromRoute';

const TemporaryPlant: React.FC = () => {
  const id = useGetIdFromRoute();
  const { data } = useTemporaryPlantQuery({ variables: { id } });

  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={10}>
        <Flex direction='row'>
          <Flex direction='column' w='40%' mr={10}>
            <Box ml='auto'>
              <PlantGallery images={data?.temporaryPlant?.images} />
            </Box>
          </Flex>
          <Flex direction='column' w='60%'>
            <Box mr='auto' maxW='60rem' minW='40rem'>
              <PlantBasics plant={data?.temporaryPlant} />
              <OptimalConditions
                optimalConditions={data?.temporaryPlant?.optimalConditions}
                plantId={id}
              />
            </Box>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default TemporaryPlant;
