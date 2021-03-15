import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const components = {
  Navbar: {
    baseStyle: (props: any) => ({
      color: mode('gray.700', 'gray.300')(props),
      bg: mode('green.500', 'green.800')(props),
    }),
  },
  Card: {
    baseStyle: (props: any) => ({
      color: mode('gray.700', 'gray.300')(props),
      bg: mode('gray.100', 'gray.800')(props),
    }),
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode('gray.700', 'gray.300')(props),
      bg: mode('gray.200', 'gray.900')(props),
    },
  }),
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const config = {
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  styles,
  components,
  config,
});

export default theme;
