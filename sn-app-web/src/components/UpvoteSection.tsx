import { ApolloCache } from "@apollo/client";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: {
        points: newPoints,
        voteStatus: value,
      },
    });
  }
};

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] =
    useState<"upvote-loading" | "downvote-loading" | "not-loading">(
      "not-loading"
    );
  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        bg={post.voteStatus !== 1 ? "snlightshades" : "success"}
        color={post.voteStatus !== 1 ? "success" : "snlightshades"}
        aria-label="upvote post"
        size="sm"
        fontSize="x-large"
        isLoading={loadingState === "upvote-loading"}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("upvote-loading");
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        bg={post.voteStatus !== -1 ? "snlightshades" : "danger"}
        color={post.voteStatus !== -1 ? "danger" : "snlightshades"}
        aria-label="downvote post"
        size="sm"
        fontSize="x-large"
        isLoading={loadingState === "downvote-loading"}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downvote-loading");
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
