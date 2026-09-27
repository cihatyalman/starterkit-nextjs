import { z } from "zod";

export const FormSchema = z.object({
  email: z.email("Lütfen geçerli bir e-posta girin.").optional(),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .max(32, "Şifre en fazla 32 karakter olmalıdır.")
    .optional(),
  otpInput: z.string().optional(),
  textarea: z.string().optional(),
  select: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  comboBox: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  dateInput: z.date().optional(),
  datePicker: z.date().optional(),
  dateRangePicker: z.object({ from: z.date(), to: z.date() }).optional(),
  multiDatePicker: z.array(z.date()).optional(),
  checkbox: z.array(z.string()).optional(),
  radioGroup: z.string().optional(),
  chips: z.array(z.string()).optional(),
  slider: z.array(z.number()).optional(),
});
export type FormModel = z.infer<typeof FormSchema>;

/* #region Helpers */
export function parseUser(data: MyAny): FormModel {
  return FormSchema.parse(data);
}
/* #endregion */
