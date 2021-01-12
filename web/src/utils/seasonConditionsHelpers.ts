import {
  OptimalConditions,
  OptimalConditionsFragment,
} from '../generated/graphql';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | null;

export const seasonToInt = (season: Season): number => {
  switch (season) {
    case 'spring':
      return 0;
    case 'summer':
      return 1;
    case 'autumn':
      return 2;
    case 'winter':
      return 3;
    default:
      return -1;
  }
};

export const intToSeason = (season: number | undefined): Season => {
  switch (season) {
    case 0:
      return 'spring';
    case 1:
      return 'summer';
    case 2:
      return 'autumn';
    case 3:
      return 'winter';
    default:
      return null;
  }
};

export const conditionsToStringArray = (
  conditions: OptimalConditionsFragment[] | undefined
): Season[] => {
  const stringified: Season[] = [];
  conditions?.forEach((c) => {
    const season = intToSeason(c.season);
    if (season) {
      stringified.push(season);
    }
  });
  return stringified;
};
