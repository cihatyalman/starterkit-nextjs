import { z } from "zod";

export const FormSchema = z.object({
  EmailAddress: z.email("Lütfen geçerli bir e-posta girin.").optional(),
  Password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .max(32, "Şifre en fazla 32 karakter olmalıdır.")
    .optional(),
  OtpInput: z.string().optional(),
  Textarea: z.string().optional(),
  Select: z
    .object({
      key: z.string(),
      label: z.string(),
    })
    .optional(),
  ComboBox: z
    .object({
      key: z.string(),
      label: z.string(),
    })
    .optional(),
  InputDatePicker: z.date().optional(),
  DatePicker: z.date().optional(),
  DateRangePicker: z.object({ from: z.date(), to: z.date() }).optional(),
  MultiDatePicker: z.array(z.date()).optional(),
  Checkbox: z.array(z.string()).optional(),
  RadioGroup: z.string().optional(),
  Chips: z.array(z.string()).optional(),
  Slider: z.array(z.number()).optional(),
});
export type FormModel = z.infer<typeof FormSchema>;

/* #region Helpers */
export function parseUser(data: MyAny): FormModel {
  return FormSchema.parse(data);
}
/* #endregion */
