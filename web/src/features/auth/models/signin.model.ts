import { z } from "zod";
import { dataSchemas } from "@/shared/models/_schema";

const RawSigninSchema = z.object({
  email: dataSchemas.email,
  password: dataSchemas.string
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir sayı içermelidir")
    .regex(/[.:@*%]/, "Şifre en az bir özel karakter (.:@*%) içermelidir"),
});
export const SigninSchema = RawSigninSchema.transform((raw) => ({
  email: raw.email,
  password: raw.password,
}));
export type SigninModel = z.infer<typeof SigninSchema>;

/* #region Helpers */
export function parseSignin(data: unknown): SigninModel {
  return SigninSchema.parse(data);
}
/* #endregion */
