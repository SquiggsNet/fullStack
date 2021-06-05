import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { SideBarLeft } from "./SideBarLeft";
import { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minH="inherit" position="sticky" m="auto" top={0} maxW={1400}>
      <NavBar />
      <Flex h="calc(100vh - 85px)" zIndex={1}>
        <SideBarLeft />
        {children}
        <Box
          right={0}
          w={3}
          bg={useColorModeValue("lightcard", "darkcard")}
        />
      </Flex>
      <Box
        h={3}
        borderBottomRadius={25}
        bottom={0}
        maxW={1400}
        bg={useColorModeValue("lightcard", "darkcard")}
      />
    </Box>
  );
};
