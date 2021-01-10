import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { BarPill } from './BarPill';

interface BarProps {
  value: number;
  of: number;
}

export const Bar: React.FC<BarProps> = ({ value, of }) => {
  let content = [];
  for (let i = 0; i < value; i++) {
    content.push(
      <BarPill width={value / (of + 1)} color='red.300' height={2} />
    );
  }
  let empty = [];
  for (let i = value; i < of; i++) {
    empty.push(
      <BarPill width={value / (of + 1)} color='gray.100' height={2} />
    );
  }
  return (
    <Flex justifyContent='space-between' direction='row' w='100%'>
      {content}
      {empty}
    </Flex>
  );
};
