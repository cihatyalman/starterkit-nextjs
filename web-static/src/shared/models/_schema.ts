import { z } from "zod";

const datetime = z.string().nullable().optional().catch(null);

const record = (defaultt: Record<string, MyAny> = {}) =>
  z.record(z.string(), z.any()).nullable().optional().catch(defaultt);

const fixedNumber = (digit: number = 5) =>
  z.coerce
    .number()
    .catch(0)
    .transform((val) => Number(val.toFixed(digit)));

export const dataSchemes = {
  datetime,
  record,
  fixedNumber,
};
