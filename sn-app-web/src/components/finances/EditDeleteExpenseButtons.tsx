import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeleteExpenseMutation } from "../../generated/graphql";

interface EditDeleteExpenseButtonsProps {
  id: number;
}

export const EditDeleteExpenseButtons: React.FC<EditDeleteExpenseButtonsProps> = ({
  id,
}) => {
  const [deleteExpense] = useDeleteExpenseMutation();

  return (
    <Box>
      <NextLink
        href="/finances/expense/edit/[id]"
        as={`/finances/expense/edit/${id}`}
      >
        <IconButton
          as={Link}
          mr={3}
          bg="warning"
          aria-label="edit expense"
          size="sm"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        bg="danger"
        aria-label="delete expense"
        size="sm"
        onClick={() => {
          deleteExpense({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: "Expense:" + id });
            },
          });
        }}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};
