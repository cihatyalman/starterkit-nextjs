import { useQueryClient } from "@tanstack/react-query";
import { queryKeys, QueryKeyType } from "./helpers";

export function useQueryCache() {
  const client = useQueryClient();

  const add = <T>(key: QueryKeyType, item: T, pageSize: number) => {
    client.setQueryData<{ pages: T[][] }>(queryKeys[key], (old) => {
      if (!old) return old;
      const firstPage = old.pages[0];
      const updatedFirstPage = [item, ...firstPage].slice(0, pageSize);

      return {
        ...old,
        pages: [updatedFirstPage, ...old.pages.slice(1)],
      };
    });
  };

  const update = <T>(
    key: QueryKeyType,
    predicate: (item: T) => boolean,
    updater: (item: T) => T,
  ) => {
    client.setQueryData<{ pages: T[][] }>(queryKeys[key], (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page: T[]) =>
          page.map((item) => (predicate(item) ? updater(item) : item)),
        ),
      };
    });
  };

  const remove = <T>(key: QueryKeyType, predicate: (item: T) => boolean) => {
    client.setQueryData<{ pages: T[][] }>(queryKeys[key], (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page: T[]) =>
          page.filter((item) => !predicate(item)),
        ),
      };
    });
  };

  const reset = (key: QueryKeyType) => {
    client.removeQueries({ queryKey: queryKeys[key] });
  };

  const resetAll = () => client.clear();

  return { add, update, remove, reset, resetAll };
}
