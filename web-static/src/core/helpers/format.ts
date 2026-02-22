import { format, unformat } from "@react-input/mask";

// npm i @react-input/mask
// ref={useMask(getFormatType("phone"))} -> inputlarda kullanılır
const FORMAT_LIST = {
  phone: {
    mask: "+90 (___) ___ __ __",
    replacement: { _: /\d/ },
  },
};

type FormatType = "phone";

export function getFormatType(key: FormatType) {
  return FORMAT_LIST[key];
}

export function getFormat(formatType: FormatType, value?: Nullable<string>) {
  if (!value) return null;
  switch (formatType) {
    case "phone":
      value = value.replace("+90", "");
      break;
  }
  return format(value, FORMAT_LIST[formatType]);
}
export function getUnformat(formatType: FormatType, value?: Nullable<string>) {
  if (!value) return null;
  let res = unformat(value, FORMAT_LIST[formatType]);
  switch (formatType) {
    case "phone":
      res = `+90${res}`;
      break;
  }
  return res;
}
