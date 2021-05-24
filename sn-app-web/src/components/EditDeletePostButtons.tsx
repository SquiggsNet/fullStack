import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [deletePost] = useDeletePostMutation();
  const { data } = useMeQuery();

  if (data?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          variant="outline"
          colorScheme="teal"
          aria-label="edit post"
          size="sm"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        variant="outline"
        colorScheme="red"
        aria-label="delete post"
        size="sm"
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Post:" + id });
            },
          });
        }}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};
