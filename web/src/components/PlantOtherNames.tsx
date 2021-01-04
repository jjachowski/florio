import { Box } from '@chakra-ui/react';
import React from 'react';
import { FullPlantFragment } from '../generated/graphql';

interface PlantOtherNamesProps {
  plant: FullPlantFragment;
}

export const PlantOtherNames: React.FC<PlantOtherNamesProps> = ({ plant }) => {
  return (
    <Box>
      {plant.names.length > 0 && (
        <Box mb={6} color="gray.500">
          inaczej:{' '}
          {plant.names
            .filter((n) => !n.isPrimary)
            .map((n) => n.name)
            .join(', ')}
        </Box>
      )}
    </Box>
  );
};
