import { z } from "zod";

/* #region string */
const stringFn = (label: string) => {
  return z.preprocess(
    (val) => {
      if (val === null || val === undefined) return "";
      return String(val).trim();
    },
    z.string().min(1, `${label}: Bu alan boş bırakılamaz!`),
  );
};
const string = z
  .string({ error: "Bu alan boş bırakılamaz!" })
  .min(1, "Bu alan boş bırakılamaz!");
const stringNullable = z.preprocess(
  (val) => (val === "" ? null : val),
  z.string().nullish().catch(null),
);
/* #endregion */

/* #region number */
const number = z.coerce.number({ error: "Lütfen geçerli bir sayı girin" });
const fixedNumber = (digit: number = 2) =>
  z.coerce
    .number()
    .catch(0)
    .transform((val) => Number(val.toFixed(digit)));
/* #endregion */

/* #region Email */
const email = z.email("Geçersiz e-posta adresi");
/* #endregion */

/* #region Date */
const datetime = z.string().nullish().catch(null);
/* #endregion */

const record = z.record(z.string(), z.any()).nullish().catch({});

export const dataSchemas = {
  stringFn,
  string,
  stringNullable,
  number,
  fixedNumber,
  email,
  datetime,
  record,
};
