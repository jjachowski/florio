import { Box } from '@chakra-ui/react';
import React from 'react';

interface BarPillProps {
  width: number | string;
  height: number;
  color?: string;
}

export const BarPill: React.FC<BarPillProps> = ({ width, height, color }) => {
  return <Box w={width} h={height} bg={color} />;
};
