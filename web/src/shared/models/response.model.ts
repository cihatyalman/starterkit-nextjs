import { z } from "zod";
import { dataSchemas } from "./_schema";
import { showToast } from "@/core/helperx/toast";

const RawResponseSchema = z.object({
  hasError: z.boolean().catch(false),
  message: dataSchemas.stringNullable,
  validationErrors: dataSchemas.record,
  data: z.any().nullable().optional(),
});
export type RawResponse = z.infer<typeof RawResponseSchema>;

export const ResponseSchema = RawResponseSchema.transform((raw) => ({
  hasError: raw.hasError,
  message: raw.message,
  validationErrors: raw.validationErrors,
  data: raw.data,
}));
export type ResponseModel = z.infer<typeof ResponseSchema>;

/* #region Helpers */
export function parseResponse(
  data?: unknown | null,
  options?: { isOkeyNoti?: boolean },
): ResponseModel {
  if (!data) data = { hasError: true, message: "-" };
  const res = ResponseSchema.parse(data);

  if (res.hasError && res.message !== "-") {
    showToast({ type: "error", message: res.message });
  } else if (options?.isOkeyNoti && !res.hasError && res.message !== "-") {
    showToast({ type: "success", message: res.message });
  }

  return res;
}

export function getValid(model: ResponseModel, key: string): string | null {
  try {
    return model.validationErrors?.[key];
  } catch {
    return null;
  }
}
/* #endregion */
