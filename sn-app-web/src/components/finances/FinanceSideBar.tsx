import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { EditIcon } from "@chakra-ui/icons";

export const FinanceSideBar: React.FC = () => {
  return (
    <>
      <Flex direction="column" p={8} pl={0} maxW={300}>
        <Box
          bg={useColorModeValue("lightcard", "darkcard")}
          borderRadius={18}
          p={4}
        >
          <Flex direction="column">
            <NextLink href="/finances/account/create">
              <Button
                leftIcon={<EditIcon />}
                variant="ghost"
                justifyContent="flex-start"
              >
                New Account
              </Button>
            </NextLink>
            <NextLink href="/finances/expense/create">
              <Button
                leftIcon={<EditIcon />}
                mt={2}
                variant="ghost"
                justifyContent="flex-start"
              >
                New Expense
              </Button>
            </NextLink>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
