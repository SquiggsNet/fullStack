import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { ChatIcon, StarIcon } from "@chakra-ui/icons";

interface SideBarLeftProps {}

export const SideBarLeft: React.FC<SideBarLeftProps> = () => {
  const router = useRouter();
  return (
    <Flex direction="column" maxW={300} p={4}>
      <NextLink href="/">
        <Button
          leftIcon={<ChatIcon />}
          color={
            router.pathname === "/" || router.pathname.includes("/post")
              ? "primary"
              : undefined
          }
          variant="ghost"
          fontWeight="bold"
          fontSize="xl"
          justifyContent="flex-start"
        >
          Posts
        </Button>
      </NextLink>
      <NextLink href="/flip-coin">
        <Button
          leftIcon={<StarIcon />}
          color={
            router.pathname.includes("/flip-coin") ? "primary" : undefined
          }
          mt={4}
          variant="ghost"
          fontSize="xl"
          justifyContent="flex-start"
        >
          Flip Coin
        </Button>
      </NextLink>
    </Flex>
  );
};
