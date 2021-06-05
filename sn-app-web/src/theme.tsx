import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  color: "#111331",
  mono: `'Menlo', monospace`,
};

const breakpoints = createBreakpoints({
  xs: '20em',
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    black: "#191919",
    white: "#ffffff",

    lightshades: "#C5C6C7",
    // lightaccent: "#E3E3ED",
    lightprimary: "#45A29E",

    primary: "#66FCF1",

    darkprimary: "#66FCF1",
    // darkaccent: "#171721",
    darkshades: "#1E1E1E",

    lightcard: "#E3E3ED",
    darkcard: "#171717",

    Info: "#262327",
    success: "#18D42C",
    warning: "#F4B81B",
    danger: "#C91818",
  },
  styles: {
    global: (props: any) => ({
      body: {
        color: props.colorMode === "dark" ? "lightshades" : "darkshades",
        backgroundColor:
          props.colorMode === "dark" ? "darkshades" : "lightshades",
      },
    }),
  },
  fonts,
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
});

export default theme
