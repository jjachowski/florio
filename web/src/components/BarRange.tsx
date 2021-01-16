import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BarPill } from './BarPill';

interface BarRangeProps {
  low: number;
  high: number;
  height: number;
  rangeBottom: number;
  rangeTop: number;
  color: string | 'temperature';
}

export const BarRange: React.FC<BarRangeProps> = ({
  low,
  high,
  height,
  color,
  rangeBottom,
  rangeTop,
}) => {
  return (
    <Flex
      style={
        color === 'temperature'
          ? {
              background:
                'linear-gradient(90deg, rgba(83,111,252,1) 0%, rgba(255,91,91,1) 100%)',
            }
          : {}
      }
      // bgGradient={`linear(to-r, ${color}, ${gradientInto})`} wont work because needs chakra 1.1+
      rounded={height * 2}
      bg={color !== 'temperature' ? color : 'none'}
      overflow='hidden'
      justifyContent='space-between'
      align='center'
      direction='row'
      w='100%'
    >
      <BarPill
        width={(low - rangeBottom) / (rangeBottom + rangeTop)}
        color='gray.100'
        height={height}
      />
      {/* <Box ml={1}>{low}</Box> */}
      <BarPill
        width={(high - low) / (rangeBottom + rangeTop)}
        height={height}
      />
      {/* <Box mr={1}>{high}</Box> */}

      <BarPill
        width={(rangeTop - high) / (rangeBottom + rangeTop)}
        color='gray.100'
        height={height}
      />
    </Flex>
  );
};
