import {
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logout, { loading: logoutFecthing }] = useLogoutMutation();
  const router = useRouter();
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
          <Button
            color={
              router.pathname.includes("/login")
                ? useColorModeValue("lightprimary", "darkprimary")
                : undefined
            }
            variant="link"
            fontSize="xl"
            as={Link}
            mr={4}
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            color={
              router.pathname.includes("/register")
                ? useColorModeValue("lightprimary", "darkprimary")
                : undefined
            }
            variant="link"
            fontSize="xl"
            as={Link}
          >
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <Menu>
          <MenuButton as={Button} fontSize="xl" rightIcon={<ChevronDownIcon />}>
            {data.me.username}
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
              </MenuItem>
              <MenuItem
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
    <Flex
      borderTopRadius={25}
      bg={useColorModeValue("lightcard", "darkcard")}
      zIndex={1}
      position="sticky"
      top={0}
    >
      <Flex flex={1} align="center" m="auto" p={4} maxW={1400}>
        {/* <NextLink href="/"> */}
          <Button variant="gohst" onClick={toggleColorMode} fontSize="xl">
            theSquiggsNet
          </Button>
        {/* </NextLink> */}
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
