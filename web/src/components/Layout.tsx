import { Box, HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';

export type LayoutVariant = 'narrow' | 'regular' | 'full-screen';

interface LayoutProps extends HTMLChakraProps<'div'> {
  variant?: LayoutVariant;
}

export const Layout: React.FC<LayoutProps> = ({
  variant,
  children,
  ...otherProps
}) => {
  let maxWidth = '';
  switch (variant) {
    case 'narrow':
      maxWidth = '20rem';
      break;
    case 'regular':
      maxWidth = '50rem';
      break;
    case 'full-screen':
      maxWidth = '100%';
      break;
    default:
      maxWidth = '100%';
  }

  return (
    <Box
      {...otherProps}
      mx='auto'
      maxW={{ base: '100%', sm: maxWidth }}
      w='100%'
    >
      {children}
    </Box>
  );
};
