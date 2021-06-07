import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeleteAccountMutation } from "../../generated/graphql";

interface EditDeleteAccountButtonsProps {
  id: number;
}

export const EditDeleteAccountButtons: React.FC<EditDeleteAccountButtonsProps> = ({
  id,
}) => {
  const [deleteAccount] = useDeleteAccountMutation();

  return (
    <Box>
      <NextLink
        href="/finances/account/edit/[id]"
        as={`/finances/account/edit/${id}`}
      >
        <IconButton
          as={Link}
          mr={3}
          bg="warning"
          aria-label="edit account"
          size="sm"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        bg="danger"
        aria-label="delete account"
        size="sm"
        onClick={() => {
          deleteAccount({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Account:" + id });
            },
          });
        }}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};
