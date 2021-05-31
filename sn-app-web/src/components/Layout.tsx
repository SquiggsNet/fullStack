import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
  color: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant, color }) => {
  return (
    <>
      <NavBar />
      <Wrapper color={color} variant={variant}>{children}</Wrapper>
    </>
  );
};
