import React from "react";
import { Layout } from "../../../components/Layout";
import { Heading } from "@chakra-ui/layout";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { withApollo } from "../../../utils/withApollo";
import { Wrapper } from "../../../components/Wrapper";
import { useGetExpenseFromUrl } from "../../../utils/useGetExpenseFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";

const Expense = ({}) => {
  useIsAuth();
  const { data, loading } = useGetExpenseFromUrl();

  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (!data?.expense) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper variant="medium">
        <Box
          bg={useColorModeValue("lightcard", "darkcard")}
          borderRadius={18}
          p={5}
        >
          <Heading mb={4}>{data.expense.name}</Heading>
          <Box mb={4}>{data.expense.description}</Box>
          <Box mb={4}>{data.expense.value}</Box>
          <Box mb={4}>{data.expense.frequency}</Box>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Expense);
