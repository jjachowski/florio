import { Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons/lib/cjs/iconBase';
import { Season } from '../utils/seasonConditionsHelpers';

interface SeasonIconProps {
  currentlySelected: Season;
  season: Season;
  icon: IconType;
  handleClick: React.Dispatch<React.SetStateAction<Season>>;
}

export const SeasonIcon: React.FC<SeasonIconProps> = ({
  icon,
  currentlySelected,
  handleClick,
  season,
}) => {
  let color = '';
  switch (season) {
    case 'spring':
      color = 'green.400';
      break;
    case 'summer':
      color = 'yellow.400';
      break;
    case 'autumn':
      color = 'orange.400';
      break;
    case 'winter':
      color = 'blue.400';
      break;
  }
  return (
    <Icon
      p={1}
      boxSize={10}
      bg={currentlySelected === season ? 'gray.600' : 'none'}
      rounded={10}
      shadow={currentlySelected === season ? 'xl' : 'none'}
      onClick={() => handleClick(season)}
      cursor='pointer'
      color={color}
      as={icon}
    />
  );
};
