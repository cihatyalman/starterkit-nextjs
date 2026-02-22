export type QueryKeyType = keyof typeof queryKeys;

export const queryKeys = {
  product: ["product"],
};

export function getPageCount<T>(pages: T[][], pageSize: number) {
  let pageCount = 0;
  if ((pages[pages.length - 1].length || 0) === pageSize) {
    pageCount = pages.length + 1;
  } else {
    pageCount = pages.length;
  }
  return pageCount;
}
