import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { FaCat, FaDog } from 'react-icons/fa';
import {
  FullPlantFragment,
  FullTemporaryPlantFragment,
} from '../generated/graphql';

interface EmblemsProps {
  plant: FullPlantFragment | FullTemporaryPlantFragment;
}

export const Emblems: React.FC<EmblemsProps> = ({ plant }) => {
  return (
    <Flex direction='row' justifyContent='space-between' fontSize={40}>
      {plant.isDogFriendly && (
        <Tooltip label='Bezpieczna dla Twojego psa'>
          <Box>
            <Icon as={FaDog} />
          </Box>
        </Tooltip>
      )}
      {plant.isCatFriendly && (
        <Tooltip label='Bezpieczna dla Twojego kitka'>
          <span>
            <Icon as={FaCat} />
          </span>
        </Tooltip>
      )}
    </Flex>
  );
};
