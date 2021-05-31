import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import { usePostsQuery } from "../generated/graphql";
import { truncate } from "../utils/trancate";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    // TODO: improve later
    return (
      <Layout color="snlightshades">
        <div>
          <div>{error?.message}</div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box overflow="auto">
        {!data && loading ? (
          <>
            <div>loading...</div>
          </>
        ) : (
          <>
            <Stack spacing={8}>
              {data!.posts.posts.map((p) =>
                !p ? null : (
                  <Flex
                    bg="snlightshades"
                    key={p.id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                  >
                    <UpvoteSection post={p} />
                    <Box flex={1}>
                      <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                        <Link>
                          <Heading> {p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text>Posted by {p.creator.username}</Text>
                      <Flex align="center">
                        <Text flex={1} mt={4}>
                          {truncate(p.textSnippet)}
                        </Text>
                        <EditDeletePostButtons
                          id={p.id}
                          creatorId={p.creator.id}
                        />
                      </Flex>
                    </Box>
                  </Flex>
                )
              )}
            </Stack>
          </>
        )}
        {data && data.posts.hasMore ? (
          <Flex>
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor:
                      data.posts.posts[data.posts.posts.length - 1].createdAt,
                  },
                });
              }}
              isLoading={loading}
              m="auto"
              my={8}
            >
              Load More
            </Button>
          </Flex>
        ) : null}
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
