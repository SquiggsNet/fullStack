import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper";
import { Account, Expense, useCreateFinanceProfileMutation, useMyFinancesQuery } from "../../generated/graphql"
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import { Stack } from "@chakra-ui/react";
import { AccountList } from "../../components/finances/AccountList";
import { ExpenseList } from "../../components/finances/ExpenseList";
import { FinanceSideBar } from "../../components/finances/FinanceSideBar";
import { EditIcon } from "@chakra-ui/icons";

const Finances = ({}) => {
  useIsAuth();
  const { data, error, loading } = useMyFinancesQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [createFinanceProfile, { loading: createProfileLoading }] = useCreateFinanceProfileMutation();

  const createProfileComp = (
    <Box
      bg={useColorModeValue("lightcard", "darkcard")}
      borderRadius={18}
      m="auto"
      mt={25}
      p={4}
    >
      <Button
        leftIcon={<EditIcon />}
        variant="ghost"
        justifyContent="flex-start"
        onClick={async () => {
          await createFinanceProfile({
            // update: (cache, { data }) => {
            //   cache.writeQuery<MyFinancesQuery>({
            //     query: MyFinancesDocument,
            //     data: {
            //       __typename: "Query",
            //       myFinances: data?.createFinanceProfile,
            //     },
            //   });
            // },
          });
        }}
        isLoading={createProfileLoading}
      >
        Create New Financial Profile
      </Button>
    </Box>
  );

  if (!loading && !data) {
    // TODO: improve later
    return (
      <Layout>
        {createProfileComp}
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
    <Layout>
      {data &&
      data.myFinances &&
      data.myFinances[0] &&
      data.myFinances[0].id ? (
        <>
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
        </>
      ) : (
        <Flex
          direction="row"
          grow={1}
        >
          {createProfileComp}
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Finances);
