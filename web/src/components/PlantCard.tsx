import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { PlantPreviewFragment } from '../generated/graphql';
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
        src={plant.imageUrl}
        alt='Kalatea'
      />
      <Flex p={10} pb={2} direction='column' w='100%'>
        <Link
          onClick={() => {
            router.push(`/plant/${plant.id}`);
          }}
        >
          <Heading>{plant.primaryName}</Heading>
        </Link>
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
