import { z } from "zod";
import { dataSchemas } from "@/shared/models/_schema";

export const ForgotSchema = z.object({
  email: dataSchemas.email,
  code: dataSchemas.stringOptional,
  password: dataSchemas.stringOptional,
  confirmPassword: dataSchemas.stringOptional,
});
export type ForgotModel = z.infer<typeof ForgotSchema>;

/* #region Helpers */
export function parseForgot(data: unknown): ForgotModel {
  return ForgotSchema.parse(data);
}
/* #endregion */
