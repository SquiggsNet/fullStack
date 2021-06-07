import { Box } from "@chakra-ui/layout";
import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";


interface NavButtonProps {
  isCurrent: boolean;
  label: string;
  route: string;
  icon?: any; // TODO: look into how to properly assign (no any)
}

export const NavButton: React.FC<NavButtonProps> = ({
  label = "",
  route = "/",
  isCurrent = false,
  icon,
}) => {
  return (
    <NextLink href={route}>
      <Button
        color={
          isCurrent
            ? useColorModeValue("lightprimary", "darkprimary")
            : undefined
        }
        variant="ghost"
        fontWeight="bold"
        fontSize="xl"
        justifyContent="flex-start"
        borderLeftColor={useColorModeValue("lightprimary", "darkprimary")}
        borderLeftWidth={isCurrent ? 4 : 0}
      >
        {icon ? <Box mr={2}>{icon}</Box> : <></>}
        <Text display={{ xs: "none", lg: "block" }}>{label}</Text>
      </Button>
    </NextLink>
  );
};
