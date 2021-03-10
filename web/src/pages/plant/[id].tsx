import { EditIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { ConditionBars } from '../../components/ConditionBars';
import { ConditionSeasonsSwitch } from '../../components/ConditionSeasonsSwitch';
import { Emblems } from '../../components/Emblems';
import { Layout } from '../../components/Layout';
import { LikePlant } from '../../components/LikePlant';
import { Navbar } from '../../components/Navbar';
import { PlantGallery } from '../../components/PlantGallery';
import { PlantOtherNames } from '../../components/PlantOtherNames';
import { usePlantQuery } from '../../generated/graphql';
import {
  conditionsToStringArray,
  intToSeason,
  Season,
} from '../../utils/seasonConditionsHelpers';
import useGetIdFromRoute from '../../utils/useGetIdFromRoute';

const Plant: React.FC = () => {
  const id = useGetIdFromRoute();
  const { data } = usePlantQuery({ variables: { id } });
  const [selectedSeason, setSelectedSeason] = useState<Season>(null);

  const router = useRouter();

  useEffect(() => {
    if (!selectedSeason && data) {
      const intSeasons = data?.plant?.optimalConditions
        ?.map((o) => o.season)
        .sort();

      if (intSeasons) {
        const season = intToSeason(intSeasons[0]);
        setSelectedSeason(season);
      }
    }
  }, [data]);
  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={10}>
        <Flex direction='row'>
          <Flex direction='column' minW='40%' maxW='40rem' mr={10}>
            <PlantGallery images={data?.plant?.images} />
          </Flex>
          <Flex direction='column'>
            <Card isFlex direction='column'>
            <Flex direction='row'>
                <Flex direction='column'>
                  <Flex as={Heading} size='lg' align='center'>
                    <LikePlant plantId={data?.plant?.id} />
                    {data?.plant?.primaryName}
                  </Flex>

                  <Box ml='auto'>
                    {data?.plant && (
                      <PlantOtherNames names={data?.plant.otherNames} />
                    )}
                  </Box>
                </Flex>

                <Box ml='auto'>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      rounded='full'
                      icon={<EditIcon />}
                    />

                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          router.push(`/plant/${data?.plant?.id}/edit`)
                        }
                      >
                        Edytuj dane o roślinie
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          router.push(`/plant/${data?.plant?.id}/conditions`)
                        }
                      >
                        Dodaj/edytuj optymalne warunki
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          router.push(`/plant/${data?.plant?.id}/report`)
                        }
                      >
                        <WarningTwoIcon mr={2} /> Zgłoś
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
              <Flex direction='row' align='center'>
                <Box ml='auto'>
                  {data?.plant && <Emblems plant={data?.plant} />}
                </Box>
              </Flex>

              <Box unselectable='on'>{data?.plant?.description}</Box>
            </Card>
            <Card mt={4} pt={0}>
              <ConditionSeasonsSwitch
                my={4}
                currentlySelected={selectedSeason}
                onSeasonSelected={setSelectedSeason}
                seasonsToDisplay={conditionsToStringArray(
                  data?.plant?.optimalConditions
                )}
              />
              <ConditionBars
                conditions={data?.plant?.optimalConditions}
                selectedSeason={selectedSeason}
              />
            </Card>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Plant;
