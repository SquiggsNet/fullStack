import { Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, useColorMode } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
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
          <Button color="snlightshades" variant="link" as={Link} mr={4}>
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button color="snlightshades" variant="link" as={Link}>
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
            color="snlightshades"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {data.me.username}
          </MenuButton>
          <Portal>
            <MenuList bg="snmain">
              <MenuItem
                color="snlightshades"
                onClick={toggleColorMode}
              >
                Toggle {colorMode === "light" ? "Dark" : "Light"}
              </MenuItem>
              <MenuItem
                color="snlightshades"
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
    <Flex zIndex={1} position="sticky" top={0} bg="snmain" p={4}>
      <Flex flex={1} align="center" m="auto" maxW={1050}>
        <Menu>
          <MenuButton
            color="snlightshades"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            theSquiggsNet
          </MenuButton>
          <Portal>
            <MenuList bg="snmain">
              <NextLink href="/">
                <MenuItem color="snlightshades">Home</MenuItem>
              </NextLink>
              <NextLink href="/post/create">
                <MenuItem color="snlightshades">
                  &nbsp;&nbsp;&nbsp;&nbsp;Create Post
                </MenuItem>
              </NextLink>
              <NextLink href="/flip-coin">
                <MenuItem color="snlightshades"> Flip Coin</MenuItem>
              </NextLink>
            </MenuList>
          </Portal>
        </Menu>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
