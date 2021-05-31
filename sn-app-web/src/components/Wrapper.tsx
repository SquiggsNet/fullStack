import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  color: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  color = undefined,
}) => {
  return (
    <Box
      mt={8}
      p={8}
      mx="auto"
      bg={color}
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
