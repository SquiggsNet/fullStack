import { Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
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
          <Button color="white" variant="link" as={Link} mr={2}>
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button color="white" variant="link" as={Link} mr={2}>
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <Menu>
          <MenuButton color="white" as={Button} rightIcon={<ChevronDownIcon />}>
            {data.me.username}
          </MenuButton>
          <Portal>
            <MenuList bg="#00db9a">
              <MenuItem
                color="white"
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
    <Flex zIndex={1} position="sticky" top={0} bg="#00db9a" p={4}>
      <Flex flex={1} align="center" m="auto" maxW={1050}>
        <Menu>
          <MenuButton color="white" as={Button} rightIcon={<ChevronDownIcon />}>
            theSquiggsNet
          </MenuButton>
          <Portal>
            <MenuList bg="#00db9a">
              <NextLink href="/">
                <MenuItem color="white">Home</MenuItem>
              </NextLink>
              <NextLink href="/post/create">
                <MenuItem color="white">Create Post</MenuItem>
              </NextLink>
              <NextLink href="/flip-coin">
                <MenuItem color="white"> Flip Coin</MenuItem>
              </NextLink>
            </MenuList>
          </Portal>
        </Menu>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
