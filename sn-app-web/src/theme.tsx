import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  color: "#111331",
  mono: `'Menlo', monospace`,
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: "#191919",
    white: "#ffffff",

    // background: "#62908B",
    // snlightshades: "#FAFBFA",
    // snlightaccent: "#A5A5A8",
    // snmain: "#DDA06E",
    // sndarkaccent: "#B18A7C",
    // sndarkshades: "#62908B",
    // primary: "#DDA06E",

    background: "#F4F6F5",
    snlightshades: "#F4F6F5",
    snlightaccent: "#8FA494",
    snmain: "#5DB65E",
    sndarkaccent: "#7E756C",
    sndarkshades: "#262327",
    primary: "#5DB65E",
    secondary: "#999999",

    // background: "#111331",
    // snlightshades: "#F9FAF6",
    // snlightaccent: "#4499D8",
    // snmain: "#6C4B8C",
    // sndarkaccent: "#4483B8",
    // sndarkshades: "#111331",
    // primary: "#6c4b8c",

    Info: "#262327",
    success: "#51b154",
    warning: "#cea11c",
    danger: "#f44336",
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
