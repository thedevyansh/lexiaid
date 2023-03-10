import { extendTheme, theme as base } from '@chakra-ui/react';

export const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: `Inter, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  styles: {
    global: props => ({
      body: {
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.900',
      },
    }),
  },
};

const theme = extendTheme(config);

export default theme;
