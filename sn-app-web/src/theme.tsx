import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  color: 'sndarkshades',
  mono: `'Menlo', monospace`
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: "#191919",
    white: "#EDE5DA",
    background: "#EDE5DA",
    snlightshades: "#EDE5DA",
    snlightaccent: "#879F8E",
    snmain: "#864C2C",
    sndarkaccent: "#A17845",
    sndarkshades: "#361E1B",
    primary: "#864b2b",
    Info: "#361e1b",
    success: "#5d9145",
    warning: "#db810d",
    danger: "#f44336",
  },
  backgroundColor: "#EDE5DA",
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
