import { z } from "zod";
import { dataSchemas } from "@/shared/models/_schema";

const RawSignupSchema = z.object({
  username: dataSchemas.string
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .refine((val) => !/\s/.test(val), {
      message: "Kullanıcı adı boşluk içeremez",
    })
    .refine((val) => /^[a-z0-9_]+$/.test(val), {
      message:
        "Kullanıcı adı sadece küçük harf, sayı ve alt çizgi (_) içerebilir",
    }),
  email: dataSchemas.email,
  password: dataSchemas.string
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir sayı içermelidir")
    .regex(/[.:@*%]/, "Şifre en az bir özel karakter (.:@*%) içermelidir"),
  confirmPassword: dataSchemas.string
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir sayı içermelidir")
    .regex(/[.:@*%]/, "Şifre en az bir özel karakter (.:@*%) içermelidir"),
});
export const SignupSchema = RawSignupSchema.transform((raw) => ({
  username: raw.username,
  email: raw.email,
  password: raw.password,
  confirmPassword: raw.confirmPassword,
}));
export type SignupModel = z.infer<typeof SignupSchema>;

/* #region Helpers */
export function parseSignup(data: unknown): SignupModel {
  return SignupSchema.parse(data);
}
/* #endregion */
