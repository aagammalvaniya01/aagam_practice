import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      primary: '#4287f5',
      header: {
        bgColor: "linear-gradient(91.83deg, rgb(220, 240, 251) 1.35%, rgb(218, 230, 252) 98.54%);",
        fontColor: {
          default: "#1d2433",
        }
      },
      table: {
        iconColor: "#1A202C",
        iconBG: "#EDF2F7",
      }
    },
    dark: {
      primary: '#61dafb',
      header: {
        bgColor: "#11141b",
        fontColor: {
          default: "#fff",
        }
      },
      table: {
        iconColor: "rgba(255, 255, 255, 0.92)",
        iconBG: "rgba(255, 255, 255, 0.08)",
      }
    },
  },
});

export default customTheme;
