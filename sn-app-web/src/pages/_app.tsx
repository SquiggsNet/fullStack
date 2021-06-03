import {
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* <ColorModeProvider
        options={{
          initialColorMode: "dark",
        }}
      > */}
        <Box
          minWidth="min-content"
          minHeight="100vh"
        >
          <Component {...pageProps} />
        </Box>
      {/* </ColorModeProvider> */}
    </ChakraProvider>
  );
}

export default MyApp;
