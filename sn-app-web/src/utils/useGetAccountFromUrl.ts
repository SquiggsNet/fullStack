import { useAccountQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetAccountFromUrl = () => {
  const intId = useGetIntId();
  return useAccountQuery({
    variables: {
      id: intId,
    },
  });
};
