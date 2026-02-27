import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys, QueryKeyType } from "./helpers";

type MutationConfig<TVariables, TReturn> = {
  mutationFn: (vars: TVariables) => Promise<TReturn | null>;
  onSuccess?: (data: TReturn | null) => void;
};

export const useApiMutation = <TVariables>() => {
  const useConfig = <TReturn>(config: MutationConfig<TVariables, TReturn>) => {
    return useMutation({ ...config });
  };
  return useConfig;
};

export function useReset(queryKey: QueryKeyType) {
  const client = useQueryClient();
  return client.removeQueries({ queryKey: queryKeys[queryKey] });
}
