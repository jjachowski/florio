import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, IconButton, ScaleFade } from '@chakra-ui/react';
import { Image as CloudinaryImage, Transformation } from 'cloudinary-react';
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
    <Box position='relative' height='100%' width='100%'>
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
      <Box h='100%' w='100%'>
        {images?.map((image, index) => (
          <ScaleFade
            key={index}
            initialScale={0.9}
            in={index === currentImageIndex}
          >
            {index === currentImageIndex && (
              <Box shadow='md' rounded={20} overflow='hidden'>
                <CloudinaryImage cloudName='disxisevt' publicId={image}>
                  <Transformation
                    height='1600'
                    quality='40'
                    width='1200'
                    crop='fill'
                  />
                </CloudinaryImage>
              </Box>
            )}
          </ScaleFade>
        ))}
      </Box>
    </Box>
  );
};
