import React from 'react';
import { FullPlantFragment } from '../generated/graphql';
import { Card } from './Card';
import { FaDog, FaCat } from 'react-icons/fa';
import {
  Box,
  Button,
  Flex,
  Icon,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';

interface EmblemsProps {
  plant: FullPlantFragment;
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

      <Tooltip label='Bezpieczna dla Ciebie'>
        <Box>
          <Icon as={BsPersonFill} />
        </Box>
      </Tooltip>
    </Flex>
  );
};
