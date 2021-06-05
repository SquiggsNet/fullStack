import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  IoGameController,
  IoGameControllerOutline,
  IoChatbubbles,
  IoChatbubblesOutline,
} from "react-icons/io5";

interface SideBarLeftProps {}

export const SideBarLeft: React.FC<SideBarLeftProps> = () => {
  const router = useRouter();
  const currentRoute =
    router.pathname === "/" || router.pathname.includes("/post")
      ? "post"
      : router.pathname.includes("/flip-coin") ? "flip-coin" : "";
  return (
    <Flex
      bg={useColorModeValue("lightcard", "darkcard")}
      direction="column"
      maxW={300}
      pt={4}
    >
      <NextLink href="/">
        <Button
          leftIcon={
            currentRoute === "post" ? (
              <IoChatbubbles />
            ) : (
              <IoChatbubblesOutline />
            )
          }
          color={
            currentRoute === "post"
              ? useColorModeValue("lightprimary", "darkprimary")
              : undefined
          }
          variant="ghost"
          fontWeight="bold"
          fontSize="xl"
          justifyContent="flex-start"
          borderLeftColor={useColorModeValue("lightprimary", "darkprimary")}
          borderLeftWidth={currentRoute === "post" ? 4 : 0}
        >
          <Text display={{ xs: "none", lg: "block" }}>Posts</Text>
        </Button>
      </NextLink>
      <NextLink href="/flip-coin">
        <Button
          leftIcon={
            currentRoute === "flip-coin" ? (
              <IoGameController />
            ) : (
              <IoGameControllerOutline />
            )
          }
          color={
            currentRoute === "flip-coin"
              ? useColorModeValue("lightprimary", "darkprimary")
              : undefined
          }
          mt={2}
          variant="ghost"
          fontSize="xl"
          justifyContent="flex-start"
          borderLeftColor={useColorModeValue("lightprimary", "darkprimary")}
          borderLeftWidth={currentRoute === "flip-coin" ? 4 : 0}
        >
          <Text display={{ xs: "none", lg: "block" }}>Flip Coin</Text>
        </Button>
      </NextLink>
    </Flex>
  );
};
