import {
  Box,
  Flex,
  FlexOptions,
  HTMLChakraProps,
  useStyleConfig,
} from '@chakra-ui/react';
import React from 'react';

interface CardProps extends HTMLChakraProps<'div'>, FlexOptions {
  isFlex?: boolean;
}

export const Card: React.FC<CardProps> = ({
  isFlex = false,
  children,
  ...otherProps
}) => {
  const styles = useStyleConfig('Card');

  if (isFlex) {
    return (
      <Flex shadow='md' sx={styles} rounded={20} p={10} {...otherProps}>
        {children}
      </Flex>
    );
  }
  return (
    <Box shadow='2xl' sx={styles} rounded={20} p={10} {...otherProps}>
      {children}
    </Box>
  );
};
