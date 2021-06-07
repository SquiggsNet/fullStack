import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper";
import { Account, Expense, useMyFinancesQuery } from "../../generated/graphql"
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import { Box, Stack } from "@chakra-ui/react";
import { AccountList } from "../../components/finances/AccountList";
import { ExpenseList } from "../../components/finances/ExpenseList";
import { FinanceSideBar } from "../../components/finances/FinanceSideBar";

const Finances = ({}) => {
  useIsAuth();
  const { data, error, loading } = useMyFinancesQuery({
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    // TODO: improve later
    return (
      <Layout>
        <div>
          <div>{error?.message}</div>
        </div>
      </Layout>
    );
  }

  const finances = data && data.myFinances && data.myFinances[0];
  const accounts = finances?.accounts as Account[];
  const expenses = finances?.expenses as Expense[];
  return (
    <>
      <Layout>
        <Flex
          direction="row"
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          grow={1}
        >
          <Wrapper>
            <Box pb={8} overflow="auto">
              <Stack spacing={8}>
                {accounts && <AccountList accounts={accounts} />}
                {expenses && <ExpenseList expenses={expenses} />}
              </Stack>
            </Box>
          </Wrapper>
        </Flex>
        <FinanceSideBar />
      </Layout>
    </>
  );
};

export default withApollo({ ssr: false })(Finances);
