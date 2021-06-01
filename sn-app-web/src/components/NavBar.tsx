import { Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  // const { colorMode, toggleColorMode } = useColorMode();
  const [logout, { loading: logoutFecthing }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Button color="sndarkaccent" variant="link" as={Link} mr={4}>
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button color="sndarkaccent" variant="link" as={Link}>
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <Menu>
          <MenuButton
            color="sndarkaccent"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {data.me.username}
          </MenuButton>
          <Portal>
            <MenuList bg="sndarkshades">
              {/* <MenuItem color="sndarkaccent" onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
              </MenuItem> */}
              <MenuItem
                color="sndarkaccent"
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                }}
                isLoading={logoutFecthing}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0}>
      <Flex flex={1} align="center" m="auto" p={4} maxW={1400}>
        <NextLink href="/">
          <Button color="sndarkaccent" variant="gohst" >theSquiggsNet</Button>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
