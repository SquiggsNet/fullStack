import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { ChatIcon, StarIcon } from "@chakra-ui/icons";

interface SideBarLeftProps {}

export const SideBarLeft: React.FC<SideBarLeftProps> = () => {
  return (
    <Flex direction="column" maxW={200} p={4}>
      <NextLink href="/">
        <Button
          leftIcon={<ChatIcon />}
          color="primary"
          variant="ghost"
          justifyContent="flex-start"
        >
          Posts
        </Button>
      </NextLink>
      <NextLink href="/flip-coin">
        <Button
          leftIcon={<StarIcon />}
          color="sndarkaccent"
          mt={4}
          variant="ghost"
          justifyContent="flex-start"
        >
          Flip Coin
        </Button>
      </NextLink>
    </Flex>
  );
};
