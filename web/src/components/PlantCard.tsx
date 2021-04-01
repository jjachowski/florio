import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  PlantPreviewFragment,
  TemporaryPlantPreviewFragment,
} from '../generated/graphql';
import { Card } from './Card';
import { LikePlant } from './LikePlant';
import { PlantOtherNames } from './PlantOtherNames';
import { Image as CloudinaryImage, Transformation } from 'cloudinary-react';
interface PlantCardProps {
  plant: PlantPreviewFragment | TemporaryPlantPreviewFragment;
  isTemporary?: boolean;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, isTemporary }) => {
  const router = useRouter();
  const navigateToPlant = () => {
    if (isTemporary) {
      router.push(`/temporaryPlant/${plant.id}`);
    } else {
      router.push(`/plant/${plant.id}`);
    }
  };
  return (
    <Card isFlex direction='row' w='100%' p={0} key={plant.id}>
      <Box roundedLeft={12} objectFit='fill' width='15rem' overflow='hidden'>
        <CloudinaryImage cloudName='disxisevt' publicId={plant.images[0]}>
          <Transformation height='600' quality='40' width='400' crop='fill' />
        </CloudinaryImage>
      </Box>

      <Flex p={10} pb={2} direction='column' w='100%' justify='center'>
        <Flex as={Heading} align='center'>
          <LikePlant plantId={plant.id} />
          <Link onClick={navigateToPlant}>{plant.primaryName}</Link>
        </Flex>

        <PlantOtherNames names={plant.otherNames} />
        <Box mb={4}>
          {plant.descriptionSnippet}

          <Link ml={2} onClick={navigateToPlant}>
            <b>czytaj dalej</b>
          </Link>
        </Box>
        <Flex direction='row' mt='auto' w='100%' justifyContent='space-between'>
          {isTemporary && (
            <Box mr='auto' textColor='gray.500'>
              ta roślina nie została potwierdzona
            </Box>
          )}
          <Box ml='auto' textColor='gray.500'>
            dodano przez: {plant.creator.username}
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
};
