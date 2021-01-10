import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Bar } from './Bar';

interface ConditionBarsProps {}

export const ConditionBars: React.FC<ConditionBarsProps> = ({}) => {
  return (
    <>
      <VStack spacing={1}>
        <Heading size='sm'>Woda</Heading>
        <Bar value={1} of={7} color='blue.400' height={8} />

        <Heading size='sm'>Temperatura</Heading>
        <Bar
          color='blue.400'
          gradientInto='red.400'
          value={6}
          of={7}
          height={8}
        />

        <Heading size='sm'>Wilgotność powietrza</Heading>
        <Bar value={4} of={7} color='blue.100' height={8} />
      </VStack>
    </>
  );
};
