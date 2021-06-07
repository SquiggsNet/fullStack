import { Box } from "@chakra-ui/layout";
import { Heading, Link, Table, Tbody, Td, Tfoot, Th, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Account } from "../../generated/graphql";
import { EditDeleteAccountButtons } from "./EditDeleteAccountButtons";

interface Props {
  accounts: Account[];
}

export const AccountList: React.FC<Props> = ({ accounts }) => {
  const assets = accounts && accounts.filter((a) => a.isCredit) || [];
  const debts = accounts && accounts.filter((a) => !a.isCredit) || [];
  const totalAssets = assets.reduce((a, b) => a + b.balance, 0)
  const totalDebts = debts.reduce((a, b) => a + b.balance, 0);
  return (
    <Box
      shadow="md"
      borderRadius={18}
      p={5}
      bg={useColorModeValue("lightcard", "darkcard")}
    >
      <Heading as="h2" size="md">
        Accounts
      </Heading>
      <Heading mt={6} as="h3" size="sm">
        Assets
      </Heading>
      <Table variant="simple">
        {/* <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th isNumeric>Balance</Th>
            <Th></Th>
          </Tr>
        </Thead> */}
        <Tbody>
          {assets.length ? (
            assets.map((account) => (
              <NextLink
                key={account.id}
                href="/finances/account/[id]"
                as={`/finances/account/${account.id}`}
              >
                <Tr>
                  <Link as={Td} color="success">
                    {account.name}
                  </Link>
                  <Link as={Td}>{account.description}</Link>
                  <Td isNumeric>{account.balance}</Td>
                  <Td isNumeric w={125}>
                    <EditDeleteAccountButtons id={account.id} />
                  </Td>
                </Tr>
              </NextLink>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>Create An Asset Account</Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>{totalAssets | 0}</Th>
          </Tr>
        </Tfoot>
      </Table>
      <Heading mt={6} as="h3" size="sm">
        Debts
      </Heading>
      <Table variant="simple">
        {/* <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th isNumeric>Balance</Th>
          </Tr>
        </Thead> */}
        <Tbody>
          {debts.length ? (
            debts.map((account) => (
              <NextLink
                key={account.id}
                href="/finances/account/[id]"
                as={`/finances/account/${account.id}`}
              >
                <Tr>
                  <Link as={Td} color="danger">
                    {account.name}
                  </Link>
                  <Link as={Td}>{account.description}</Link>
                  <Td isNumeric>{account.balance}</Td>
                  <Td isNumeric w={125}>
                    <EditDeleteAccountButtons id={account.id} />
                  </Td>
                </Tr>
              </NextLink>
            ))
          ) : (
            <Tr>
              <Td colSpan={3}>Create An Debt Account</Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>{totalDebts | 0}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};