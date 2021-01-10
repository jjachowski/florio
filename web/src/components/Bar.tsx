import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { BarPill } from './BarPill';

interface BarProps {
  value: number;
  of: number;
  height: number;
  color: string;
  gradientInto?: string;
}

export const Bar: React.FC<BarProps> = ({
  value,
  of,
  color,
  height,
  gradientInto,
}) => {
  let content = [];
  for (let i = 0; i < value; i++) {
    content.push(<BarPill key={i} width={value / of} height={height} />);
  }
  let empty = [];
  for (let i = value; i < of; i++) {
    empty.push(
      <BarPill key={i} width={value / of} color='gray.100' height={height} />
    );
  }

  if (gradientInto) {
    return (
      <Flex
        style={{
          background:
            'linear-gradient(90deg, rgba(83,111,252,1) 0%, rgba(255,91,91,1) 100%)',
        }}
        // bgGradient={`linear(to-r, ${color}, ${gradientInto})`} wont work because needs chakra 1.1+
        rounded={height * 2}
        overflow='hidden'
        justifyContent='space-between'
        direction='row'
        w='100%'
        bg={color}
      >
        {content}
        {empty}
      </Flex>
    );
  } else {
    return (
      <Flex
        rounded={height * 2}
        overflow='hidden'
        justifyContent='space-between'
        direction='row'
        w='100%'
        bg={color}
      >
        {content}
        {empty}
      </Flex>
    );
  }
};
