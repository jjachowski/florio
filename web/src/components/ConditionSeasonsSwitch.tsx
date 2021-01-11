import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsSun } from 'react-icons/bs';
import { FaCanadianMapleLeaf } from 'react-icons/fa';
import { GiFlowerEmblem, GiSnowing } from 'react-icons/gi';
import { SeasonIcon } from './SeasonIcon';

interface ConditionSeasonsSwitchProps {
  // selectedSeason: 'spring' | 'summer' | 'autumn' | 'winter';
  seasonsToDisplay: ('spring' | 'summer' | 'autumn' | 'winter' | 'all')[];
}

export const ConditionSeasonsSwitch: React.FC<ConditionSeasonsSwitchProps> = ({
  seasonsToDisplay,
}) => {
  const [currentlySelected, setCurrentlySelected] = useState<
    'spring' | 'summer' | 'autumn' | 'winter' | null
  >(null);
  return (
    <Flex direction='row' justifyContent='space-evenly'>
      {seasonsToDisplay.find((s) => s === 'spring' || s === 'all') && (
        <SeasonIcon
          icon={GiFlowerEmblem}
          season='spring'
          handleClick={setCurrentlySelected}
          currentlySelected={currentlySelected}
        />
      )}
      {seasonsToDisplay.find((s) => s === 'summer' || s === 'all') && (
        <SeasonIcon
          icon={BsSun}
          season='summer'
          handleClick={setCurrentlySelected}
          currentlySelected={currentlySelected}
        />
      )}
      {seasonsToDisplay.find((s) => s === 'autumn' || s === 'all') && (
        <SeasonIcon
          icon={FaCanadianMapleLeaf}
          season='autumn'
          handleClick={setCurrentlySelected}
          currentlySelected={currentlySelected}
        />
      )}
      {seasonsToDisplay.find((s) => s === 'winter' || s === 'all') && (
        <SeasonIcon
          icon={GiSnowing}
          season='winter'
          handleClick={setCurrentlySelected}
          currentlySelected={currentlySelected}
        />
      )}
    </Flex>
  );
};
