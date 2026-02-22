import { useInfiniteQuery } from "@tanstack/react-query";

type InfiniteConfig<TResponse> = {
  queryKey: string[];
  queryFn: (ctx: { pageParam: string | null }) => Promise<TResponse[]>;
  getNextPageParam: (
    lastPage: TResponse[],
    allPages: TResponse[][],
  ) => string | null | undefined;
  initialPageParam?: string | null;
};

export function useInfiniteList<TResponse>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam = null,
}: InfiniteConfig<TResponse>) {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam,
  });
}
