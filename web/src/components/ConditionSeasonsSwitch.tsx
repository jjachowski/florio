import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsSun } from 'react-icons/bs';
import { FaCanadianMapleLeaf } from 'react-icons/fa';
import { GiFlowerEmblem, GiSnowing } from 'react-icons/gi';
import { Season } from '../utils/seasonConditionsHelpers';
import { SeasonIcon } from './SeasonIcon';

interface ConditionSeasonsSwitchProps {
  seasonsToDisplay: Season[];
  onSeasonSelected: React.Dispatch<React.SetStateAction<Season>>;
  currentlySelected: Season;
}

export const ConditionSeasonsSwitch: React.FC<ConditionSeasonsSwitchProps> = ({
  seasonsToDisplay,
  onSeasonSelected,
  currentlySelected,
}) => {
  return (
    <Flex direction='row' justifyContent='space-evenly'>
      {seasonsToDisplay.find((s) => s === 'spring') && (
        <SeasonIcon
          icon={GiFlowerEmblem}
          season='spring'
          handleClick={onSeasonSelected}
          currentlySelected={currentlySelected}
        />
      )}
      {seasonsToDisplay.find((s) => s === 'summer') && (
        <SeasonIcon
          icon={BsSun}
          season='summer'
          handleClick={onSeasonSelected}
          currentlySelected={currentlySelected}
        />
      )}
      {seasonsToDisplay.find((s) => s === 'autumn') && (
        <SeasonIcon
          icon={FaCanadianMapleLeaf}
          season='autumn'
          handleClick={onSeasonSelected}
          currentlySelected={currentlySelected}
        />
      )}
      {seasonsToDisplay.find((s) => s === 'winter') && (
        <SeasonIcon
          icon={GiSnowing}
          season='winter'
          handleClick={onSeasonSelected}
          currentlySelected={currentlySelected}
        />
      )}
    </Flex>
  );
};
