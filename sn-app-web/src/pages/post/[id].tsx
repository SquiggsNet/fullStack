import React from "react";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withApollo } from "../../utils/withApollo";
import { Wrapper } from "../../components/Wrapper";

const Post = ({}) => {
  const { data, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout color="snlightshades">
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout color="snlightshades">
        <Box>loading...</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper variant="small" color="sndarkaccent">
        <Heading mb={4}>{data.post.title}</Heading>
        <Box mb={4}>{data.post.text}</Box>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Post);
