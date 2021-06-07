import { Box } from "@chakra-ui/layout";
import { Heading, Link, Table, Tbody, Td, Tfoot, Th, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Expense } from "../../generated/graphql";
import { EditDeleteExpenseButtons } from "./EditDeleteExpenseButtons";

interface Props {
  expenses: Expense[];
}

export const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((a, b) => a + b.value, 0);
  return (
    <Box
      shadow="md"
      borderRadius={18}
      p={5}
      bg={useColorModeValue("lightcard", "darkcard")}
    >
      <Heading as="h2" size="md">
        Expenses
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
          {expenses.length ? (
            expenses.map((expense) => (
              <NextLink
                key={expense.id}
                href="/finances/expense/[id]"
                as={`/finances/expense/${expense.id}`}
              >
                <Tr>
                  <Link as={Td} color="danger">
                    {expense.name}
                  </Link>
                  <Link as={Td}>{expense.description}</Link>
                  <Td isNumeric>{expense.value}</Td>
                  <Td isNumeric w={125}>
                    <EditDeleteExpenseButtons id={expense.id} />
                  </Td>
                </Tr>
              </NextLink>
            ))
          ) : (
            <Tr>
              <Td colSpan={3}>Create An Expense</Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>{totalExpenses | 0}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};