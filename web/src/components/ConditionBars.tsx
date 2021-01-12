import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  OptimalConditions,
  OptimalConditionsFragment,
  usePlantQuery,
} from '../generated/graphql';
import { Season, seasonToInt } from '../utils/seasonConditionsHelpers';
import { Bar } from './Bar';
import { BarRange } from './BarRange';

interface ConditionBarsProps {
  conditions: OptimalConditionsFragment[] | undefined;
  selectedSeason: Season;
}

export const ConditionBars: React.FC<ConditionBarsProps> = ({
  conditions,
  selectedSeason,
}) => {
  console.log(selectedSeason);

  const currentConditions = conditions?.find(
    (c) => c.season === seasonToInt(selectedSeason)
  );
  if (!currentConditions) {
    return null;
  }

  return (
    <>
      <VStack spacing={1}>
        <Heading size='sm'>Woda</Heading>
        <Bar
          value={currentConditions.water}
          of={5}
          color='blue.400'
          height={4}
        />

        <Heading size='sm'>Temperatura</Heading>
        <BarRange
          color='temperature'
          rangeBottom={15}
          rangeTop={40}
          low={currentConditions.temperatureLow}
          high={currentConditions.temperatureHigh}
          height={4}
        />

        <Heading size='sm'>Wilgotność powietrza</Heading>
        <BarRange
          color='blue.100'
          rangeBottom={0}
          rangeTop={100}
          low={currentConditions.airHumidityLow}
          high={currentConditions.airHumidityHigh}
          height={4}
        />
      </VStack>
    </>
  );
};
