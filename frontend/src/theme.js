import { extendTheme, theme as base } from '@chakra-ui/react';

export const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: `Poppins, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  styles: {
    global: props => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.900',
      },
    }),
  },
};

const theme = extendTheme(config);

export default theme;
