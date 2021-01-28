import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { PlantPreviewFragment } from '../generated/graphql';
import { LikePlant } from './LikePlant';
import { PlantOtherNames } from './PlantOtherNames';

interface PlantCardProps {
  plant: PlantPreviewFragment;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter();
  return (
    <Flex direction='row' boxShadow='xl' w='100%' rounded={12} key={plant.id}>
      <Image
        roundedLeft={12}
        objectFit='fill'
        width='15rem'
        src={
          plant.images
            ? plant.images[0]
            : 'https://res.cloudinary.com/disxisevt/image/upload/c_fit,h_500,w_500/v1611869843/test/placeholder.png'
        }
        alt='Kalatea'
      />
      <Flex p={10} pb={2} direction='column' w='100%' justify='center'>
        <Flex as={Heading} align='center'>
          <LikePlant plantId={plant.id} />
          <Link
            onClick={() => {
              router.push(`/plant/${plant.id}`);
            }}
          >
            {plant.primaryName}{' '}
          </Link>
        </Flex>

        <PlantOtherNames names={plant.otherNames} />
        <Box mb={4}>
          {plant.descriptionSnippet}

          <Link
            ml={2}
            onClick={() => {
              router.push(`/plant/${plant.id}`);
            }}
          >
            <b>czytaj dalej</b>
          </Link>
        </Box>
        <Box mt='auto' ml='auto'>
          <Box textColor='gray.500'>dodano przez: {plant.creator.username}</Box>
        </Box>
      </Flex>
    </Flex>
  );
};
