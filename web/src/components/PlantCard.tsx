import { background, Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FullPlantFragment, Plant } from '../generated/graphql';
import { PlantOtherNames } from './PlantOtherNames';

interface PlantCardProps {
  plant: FullPlantFragment;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter();
  return (
    <Flex direction='row' boxShadow='xl' w='100%' rounded={12} key={plant.id}>
      <Image
        roundedLeft={12}
        objectFit='cover'
        width='15rem'
        src='https://zielony-parapet.pl/5136-thickbox_default/calathea-lancifolia-kalatea-lancetolistna.jpg'
        alt='Kalatea'
      />
      <Box bg='trans' p={10}>
        <Link
          onClick={() => {
            router.push(`/plant/${plant.id}`);
          }}
        >
          <Heading>{plant.names.find((n) => n.isPrimary)?.name}</Heading>
        </Link>
        <PlantOtherNames plant={plant} />
        <Box>
          {plant.description.length > 300
            ? plant.description.substring(0, 300) + '...'
            : plant.description}
        </Box>
      </Box>
    </Flex>
  );
};
