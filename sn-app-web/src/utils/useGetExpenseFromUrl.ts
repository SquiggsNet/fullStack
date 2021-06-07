import { useExpenseQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetExpenseFromUrl = () => {
  const intId = useGetIntId();
  return useExpenseQuery({
    variables: {
      id: intId,
    },
  });
};
