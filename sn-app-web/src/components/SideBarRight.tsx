import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { EditIcon } from "@chakra-ui/icons";

interface SideBarRightProps {}

export const SideBarRight: React.FC<SideBarRightProps> = () => {
  return (
    <>
      <Flex direction="column" p={4} maxW={300}>
        <Box borderRadius={18} p={4} bg="sndarkaccent">
          <NextLink href="/post/create">
            <Button
              leftIcon={<EditIcon />}
              color="snlightshades"
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
