import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "medium" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  color?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  color = undefined,
}) => {
  return (
    <Box
      mx="auto"
      p={4}
      bg={color}
      maxW={variant === "regular" ? "800px" : variant === "medium" ? "600px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
