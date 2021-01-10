import { Box } from '@chakra-ui/react';
import React from 'react';
import {
  FullPlantFragment,
  PlantName,
  PlantPreviewFragment,
} from '../generated/graphql';

interface PlantOtherNamesProps {
  names: Array<
    { __typename?: 'PlantName' } & Pick<PlantName, 'name' | 'isPrimary'>
  >;
}

export const PlantOtherNames: React.FC<PlantOtherNamesProps> = ({ names }) => {
  return (
    <Box>
      {names.length > 0 && (
        <Box mb={6} color='gray.500'>
          inaczej:{' '}
          {names
            .filter((n) => !n.isPrimary)
            .map((n) => n.name)
            .join(', ')}
        </Box>
      )}
    </Box>
  );
};
