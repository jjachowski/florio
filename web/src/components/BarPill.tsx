import { Box } from '@chakra-ui/react';
import React from 'react';

interface BarPillProps {
  width: number;
  color: string;
  height: number;
}

export const BarPill: React.FC<BarPillProps> = ({ width, height, color }) => {
  return (
    <Box w={width} rounded={height * 2} boxShadow='lg' h={height} bg={color} />
  );
};
