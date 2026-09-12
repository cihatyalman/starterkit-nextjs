type Nullable<T> = T | null | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MyAny = any;
type MyRecord = Record<string, MyAny>;
type MyOnClick = React.MouseEvent<HTMLButtonElement>;

type MyDevice = "mobile" | "tablet" | "desktop";
type MyPLatform = "android" | "ios" | "windows" | "mac" | "linux";

type KeyLabel<T = MyAny> = {
  key: string;
  label: string;
  data?: T;
};
type KeyValue<T = MyAny> = {
  key: string;
  value: T;
};

type CustomState<T> = {
  value: T | undefined;
  set: Dispatch<SetStateAction<T | undefined>>;
};
