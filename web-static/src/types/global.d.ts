type Nullable<T> = T | null | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MyAny = any;
type MyRecord = Record<string, MyAny> | null;
type MyOnClick = React.MouseEvent<HTMLButtonElement>;

type MyDevice = "mobile" | "tablet" | "desktop";
type MyPLatform = "android" | "ios" | "windows" | "mac" | "linux";

type KeyLabel = {
  key: string;
  label: string;
};
type KeyValue<T = MyAny> = {
  key: string;
  value: T;
};

type CustomState<T> = {
  value: T | undefined;
  set: Dispatch<SetStateAction<T | undefined>>;
};

// Zustand
interface StoreProps<T> {
  data: T;
  setData: (value: T) => void;
}
