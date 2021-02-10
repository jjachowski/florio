import {
  AddIcon,
  ChevronDownIcon,
  EditIcon,
  MoonIcon,
  SunIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ConditionBars } from '../../components/ConditionBars';
import { ConditionSeasonsSwitch } from '../../components/ConditionSeasonsSwitch';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';
import { PlantOtherNames } from '../../components/PlantOtherNames';
import { useMeQuery, usePlantQuery } from '../../generated/graphql';
import {
  conditionsToStringArray,
  intToSeason,
  Season,
} from '../../utils/seasonConditionsHelpers';
import useGetIdFromRoute from '../../utils/useGetIntId';
import { TiHeartOutline, TiHeart } from 'react-icons/ti';
import { LikePlant } from '../../components/LikePlant';
import { PlantGallery } from '../../components/PlantGallery';
import { Card } from '../../components/Card';

const Plant: React.FC = () => {
  const id = useGetIdFromRoute();
  const { data: meData } = useMeQuery();
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
            <Card>test</Card>
            <Card mt={10}>
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
          <Flex direction='column'>
            <Card isFlex direction='column'>
              <Flex direction='row'>
                <Flex direction='column'>
                  <Flex as={Heading} align='center'>
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
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>

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
            <Card isFlex mt={8} direction='column'>
              <Heading size='md'>Opis</Heading>
              <Box unselectable='on'>{data?.plant?.description}</Box>
            </Card>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Plant;
