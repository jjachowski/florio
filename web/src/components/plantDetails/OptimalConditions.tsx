import { Button } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { OptimalConditionsFragment } from '../../generated/graphql';
import {
  conditionsToStringArray,
  intToSeason,
  Season,
} from '../../utils/seasonConditionsHelpers';
import { Card } from '../Card';
import { ConditionBars } from '../ConditionBars';
import { ConditionSeasonsSwitch } from '../ConditionSeasonsSwitch';

interface OptimalConditionsProps {
  optimalConditions?: OptimalConditionsFragment[] | null;
  plantId: number;
}

export const OptimalConditions: React.FC<OptimalConditionsProps> = ({
  optimalConditions,
  plantId,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<Season>(null);
  const router = useRouter();
  useEffect(() => {
    if (!selectedSeason) {
      const intSeasons = optimalConditions?.map((o) => o.season).sort();

      if (intSeasons) {
        const season = intToSeason(intSeasons[0]);
        setSelectedSeason(season);
      }
    }
  }, [optimalConditions]);
  if (optimalConditions && optimalConditions.length > 0) {
    return (
      <Card mt={4} pt={4}>
        <ConditionSeasonsSwitch
          my={4}
          currentlySelected={selectedSeason}
          onSeasonSelected={setSelectedSeason}
          seasonsToDisplay={conditionsToStringArray(optimalConditions)}
        />
        <ConditionBars
          conditions={optimalConditions}
          selectedSeason={selectedSeason}
        />
      </Card>
    );
  } else {
    return (
      <Button onClick={() => router.push(`/plant/${plantId}/conditions`)}>
        Dodaj optymalne warunki
      </Button>
    );
  }
};
