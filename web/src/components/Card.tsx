import { Box, Flex, FlexOptions, HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';

interface CardProps extends HTMLChakraProps<'div'>, FlexOptions {
  isFlex?: boolean;
}

export const Card: React.FC<CardProps> = ({
  isFlex = false,
  children,
  ...otherProps
}) => {
  if (isFlex) {
    return (
      <Flex shadow='md' rounded={20} p={10} {...otherProps}>
        {children}
      </Flex>
    );
  }
  return (
    <Box shadow='2xl' rounded={20} p={10} {...otherProps}>
      {children}
    </Box>
  );
};
