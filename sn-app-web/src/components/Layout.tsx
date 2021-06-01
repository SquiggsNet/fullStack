import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { SideBarLeft } from "./SideBarLeft";
import { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  color?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Flex zIndex={1} position="sticky" top={0} m="auto" maxW={1400}>
        <SideBarLeft />
          {children}
      </Flex>
    </>
  );
};
