import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { EditIcon } from "@chakra-ui/icons";

interface SideBarRightProps {}

export const SideBarRight: React.FC<SideBarRightProps> = () => {
  return (
    <>
      <Flex direction="column" p={8} pl={0} maxW={300}>
        <Box
          bg={useColorModeValue("lightcard", "darkcard")}
          borderRadius={18}
          p={4}
        >
          <NextLink href="/post/create">
            <Button
              leftIcon={<EditIcon />}
              variant="ghost"
              justifyContent="flex-start"
            >
              Create Post
            </Button>
          </NextLink>
        </Box>
      </Flex>
    </>
  );
};
