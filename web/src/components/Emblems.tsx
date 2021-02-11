import React from 'react';
import { FullPlantFragment } from '../generated/graphql';
import { Card } from './Card';
import { FaDog, FaCat } from 'react-icons/fa';
import { Button, Icon, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { BsPersonFill } from 'react-icons/bs';

interface EmblemsProps {
  plant: FullPlantFragment;
}

export const Emblems: React.FC<EmblemsProps> = ({}) => {
  return (
    <Card isFlex direction='row' justifyContent='space-between' fontSize={40}>
      <Tooltip label='Bezpieczna dla Twojego psa'>
        <span>
          <Icon as={FaDog} />
        </span>
      </Tooltip>
      <Tooltip label='Bezpieczna dla Twojego kitka'>
        <span>
          <Icon as={FaCat} />
        </span>
      </Tooltip>

      <Tooltip label='Bezpieczna dla Ciebie'>
        <span>
          <Icon as={BsPersonFill} />
        </span>
      </Tooltip>
    </Card>
  );
};
