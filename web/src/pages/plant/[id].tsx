import { DeleteIcon, EditIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { ConditionBars } from '../../components/ConditionBars';
import { ConditionSeasonsSwitch } from '../../components/ConditionSeasonsSwitch';
import { ConfirmButton } from '../../components/ConfirmButton';
import { Emblems } from '../../components/Emblems';
import { Layout } from '../../components/Layout';
import { LikePlant } from '../../components/LikePlant';
import { Navbar } from '../../components/Navbar';
import { PlantGallery } from '../../components/PlantGallery';
import { PlantOtherNames } from '../../components/PlantOtherNames';
import { useDeletePlantMutation, usePlantQuery } from '../../generated/graphql';
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
  const [deletePlant] = useDeletePlantMutation();
  const toast = useToast();
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

  const onDeletePlant = async () => {
    const result = await deletePlant({ variables: { plantId: id } });
    console.log('delete result: ', result);
    if (result.data?.delete) {
      toast({
        status: 'success',
        title: 'Pomyślnie usunięto roślinę',
        duration: 10000,
      });
      router.push('/');
    } else {
      toast({
        status: 'error',
        title: 'Coś poszło nie tak, spróbuj ponownie za chilę',
      });
    }
  };
  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={10}>
        <Flex direction='row'>
          <Flex direction='column' w='40%' mr={10}>
            <Box ml='auto'>
              <PlantGallery images={data?.plant?.images} />
            </Box>
          </Flex>
          <Flex direction='column' w='60%'>
            <Box mr='auto' maxW='60rem'>
              <Card isFlex direction='column' mr='auto'>
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

                  <Flex direction='row' ml='auto'>
                    <ConfirmButton
                      title='Usunięcie rośliny'
                      question='Czy na pewno chcesz usunąć roślinę?'
                      confirmText='tak'
                      colorScheme='red'
                      placement='left'
                      onYesClicked={onDeletePlant}
                    >
                      <IconButton
                        aria-label='Usuń roślinę'
                        mr={4}
                        rounded='full'
                        colorScheme='red'
                        icon={<DeleteIcon />}
                      />
                    </ConfirmButton>
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
                  </Flex>
                </Flex>
                <Flex direction='row' align='center'>
                  <Box ml='auto'>
                    {data?.plant && <Emblems plant={data?.plant} />}
                  </Box>
                </Flex>

                <Box unselectable='on'>{data?.plant?.description}</Box>
              </Card>
              {data?.plant?.optimalConditions &&
                data?.plant?.optimalConditions.length > 0 && (
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
                )}
            </Box>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Plant;
