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
      <Layout variant='full-screen' p={20}>
        <Flex direction='row'>
          <Image
            shadow='2xl'
            rounded={20}
            objectFit='cover'
            height='40rem'
            maxW='30rem'
            src={data?.plant?.imageUrl}
            alt='Kalatea'
            mr={20}
          />
          <Flex w='100%' direction='column'>
            <Flex p={10} direction='column' shadow='2xl' rounded={20}>
              <Flex direction='row'>
                <Flex direction='column'>
                  <Heading>{data?.plant?.primaryName}</Heading>
                  <Box>
                    {data?.plant && (
                      <PlantOtherNames names={data?.plant.otherNames} />
                    )}
                  </Box>
                </Flex>
                <Box ml='auto'>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<EditIcon />}>
                      Edytuj
                    </MenuButton>

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

                {/* <HStack mb='auto' spacing={2} ml='auto' fontSize='3rem'>
                  <SunIcon />
                  <MoonIcon />
                  <TimeIcon />
                </HStack> */}
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
              {/* <Flex>
                <Button
                  mt={4}
                  ml='auto'
                  colorScheme='green'
                  onClick={() =>
                    router.push(`/plant/${data?.plant?.id}/conditions`)
                  }
                >
                  Dodaj/edytuj optymalne warunki
                  <AddIcon ml={2} />
                </Button>
              </Flex> */}
            </Flex>
            <Flex p={10} mt={8} direction='column' shadow='2xl' rounded={20}>
              <Heading size='md'>Opis</Heading>
              <Box>{data?.plant?.description}</Box>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Plant;
