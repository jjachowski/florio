import { Icon } from '@chakra-ui/react';
import React from 'react';
import { TiHeart, TiHeartOutline } from 'react-icons/ti';
import {
  useDislikePlantMutation,
  useLikePlantMutation,
  useMeQuery,
} from '../generated/graphql';

interface LikePlantProps {
  plantId: number | undefined;
}

export const LikePlant: React.FC<LikePlantProps> = ({ plantId }) => {
  const { data } = useMeQuery();
  const [likePlant] = useLikePlantMutation();
  const [dislikePlant] = useDislikePlantMutation();

  if (!plantId) {
    plantId = -1;
  }
  const isLiked = data?.me?.likedPlants.includes(plantId);

  return isLiked ? (
    <Icon
      as={TiHeart}
      textColor='red.400'
      fontSize='2rem'
      boxShadow='xl'
      rounded='full'
      bg='gray.200'
      cursor='pointer'
      mr={3}
      onClick={async () => {
        console.log('click');

        if (
          !plantId ||
          plantId < 1 ||
          !data?.me ||
          data.me.likedPlants.indexOf(plantId)
        ) {
          return;
        }
        await dislikePlant({
          variables: { plantId },
          update: (cache) => {
            cache.modify({
              id: cache.identify(data?.me!),
              fields: {
                likedPlants(previous: number[]) {
                  return previous.filter((p) => p !== plantId);
                },
              },
            });
          },
        });
      }}
    />
  ) : (
    <Icon
      as={TiHeartOutline}
      cursor='pointer'
      onClick={async () => {
        console.log('click');

        if (
          !plantId ||
          plantId < 1 ||
          !data?.me ||
          !data.me.likedPlants.indexOf(plantId)
        ) {
          return;
        }
        await likePlant({
          variables: { plantId },
          update: (cache) => {
            cache.modify({
              id: cache.identify(data?.me!),
              fields: {
                likedPlants(previous: number[]) {
                  return [...previous, plantId];
                },
              },
            });
          },
        });
      }}
      fontSize='2rem'
      mr={3}
    />
  );
};
