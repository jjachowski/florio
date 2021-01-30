import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, IconButton, Image, ScaleFade } from '@chakra-ui/react';
import React, { useState } from 'react';

interface PlantGalleryProps {
  images: string[] | null | undefined;
}

export const PlantGallery: React.FC<PlantGalleryProps> = ({ images }) => {
  if (!images) {
    images = [];
  }

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const nextImage = () => {
    if (images && images.length > 1) {
      setCurrentImageIndex(
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (images && images.length > 1) {
      setCurrentImageIndex(
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
      );
    }
  };

  return (
    <Box position='relative' height='30rem' width='30rem'>
      <IconButton
        position='absolute'
        h='100%'
        w='10%'
        roundedLeft={20}
        roundedRight={0}
        background='rgba(0, 0, 0, 0.1)'
        _hover={{ background: 'rgba(0, 0, 0, 0.3)' }}
        aria-label='Previous image'
        fontSize={40}
        onClick={prevImage}
        zIndex={10}
        icon={<ChevronLeftIcon />}
      />
      <IconButton
        position='absolute'
        h='100%'
        w='10%'
        roundedLeft={0}
        roundedRight={20}
        background='rgba(0, 0, 0, 0.1)'
        _hover={{ background: 'rgba(0, 0, 0, 0.3)' }}
        aria-label='Previous image'
        fontSize={40}
        onClick={nextImage}
        right={0}
        zIndex={10}
        icon={<ChevronRightIcon />}
      />

      {images?.map((image, index) => (
        <ScaleFade initialScale={1} in={index === currentImageIndex}>
          {index === currentImageIndex && (
            <Image
              shadow='2xl'
              rounded={20}
              opacity={1}
              htmlHeight='100%'
              htmlWidth='100%'
              src={'https://res.cloudinary.com/disxisevt/image/upload/' + image}
              alt='image'
            />
          )}
        </ScaleFade>
      ))}
    </Box>
  );
};
