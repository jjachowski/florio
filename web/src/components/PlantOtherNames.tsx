import { Box } from '@chakra-ui/react';
import React from 'react';

interface PlantOtherNamesProps {
  names: string[];
}

export const PlantOtherNames: React.FC<PlantOtherNamesProps> = ({ names }) => {
  return (
    <Box>
      {names.length > 0 && (
        <Box mb={6} color='gray.500'>
          inaczej: {names.join(', ')} {names.length}
        </Box>
      )}
    </Box>
  );
};
