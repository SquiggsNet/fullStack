import React from "react";
import { Layout } from "../../../components/Layout";
import { Heading } from "@chakra-ui/layout";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { withApollo } from "../../../utils/withApollo";
import { Wrapper } from "../../../components/Wrapper";
import { useGetAccountFromUrl } from "../../../utils/useGetAccountFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";

const Account = ({}) => {
  useIsAuth();
  const { data, loading } = useGetAccountFromUrl();

  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (!data?.account) {
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
          <Heading mb={4}>{data.account.name}</Heading>
          <Box mb={4}>{data.account.description}</Box>
          <Box mb={4}>{data.account.balance}</Box>
          <Box mb={4}>{data.account.balanceDate}</Box>
          <Box mb={4}>{data.account.isCredit ? "Asset" : "Debt"}</Box>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Account);
