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
import router from 'next/router';
import React from 'react';
import {
  FullPlantFragment,
  FullTemporaryPlantFragment,
  useDeletePlantMutation,
  useMeQuery,
} from '../../generated/graphql';
import { AccountType } from '../../utils/enums';
import { Card } from '../Card';
import { ConfirmButton } from '../ConfirmButton';
import { Emblems } from '../Emblems';
import { LikePlant } from '../LikePlant';
import { PlantOtherNames } from '../PlantOtherNames';

interface PlantBasicsProps {
  plant?: FullPlantFragment | FullTemporaryPlantFragment | null;
}

export const PlantBasics: React.FC<PlantBasicsProps> = ({ plant }) => {
  if (!plant) {
    return <Card>Błąd wczytywania danych rośliny</Card>;
  }
  const { id, primaryName, otherNames, creator, description } = plant;
  const { data } = useMeQuery();
  const [deletePlant] = useDeletePlantMutation();
  const toast = useToast();

  const onDeletePlant = async () => {
    try {
      const result = await deletePlant({ variables: { plantId: id } });
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
    } catch (error) {
      if (
        error
          .toString()
          .includes('you dont have sufficient privilges to execute this action')
      ) {
        toast({
          status: 'error',
          title: 'Nie masz wymaganych uprawnień aby przeprowadzić tę akcję',
        });
      }
    }
  };

  return (
    <Card isFlex direction='column' mr='auto'>
      <Flex direction='row'>
        <Flex direction='column'>
          <Flex as={Heading} size='lg' align='center'>
            <LikePlant plantId={id} />
            {primaryName}
          </Flex>

          <Box ml='auto'>
            <PlantOtherNames names={otherNames} />
          </Box>
        </Flex>

        <Flex direction='row' ml='auto'>
          {(data?.me?.accountType === AccountType.admin ||
            data?.me?.id === creator.id) && (
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
          )}

          <Menu>
            <MenuButton as={IconButton} rounded='full' icon={<EditIcon />} />

            <MenuList>
              {(data?.me?.accountType === AccountType.admin ||
                data?.me?.id === creator.id) && (
                <>
                  <MenuItem onClick={() => router.push(`/plant/${id}/edit`)}>
                    Edytuj dane o roślinie
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.push(`/plant/${id}/conditions`)}
                  >
                    Dodaj/edytuj optymalne warunki
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={() => console.log('todo :)')}>
                Zaproponuj zmianę
              </MenuItem>
              <MenuItem onClick={() => router.push(`/plant/${id}/report`)}>
                <WarningTwoIcon mr={2} /> Zgłoś
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Flex direction='row' align='center'>
        <Box ml='auto'>
          <Emblems plant={plant} />
        </Box>
      </Flex>

      <Box unselectable='on'>{description}</Box>
    </Card>
  );
};
