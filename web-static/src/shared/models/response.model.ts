import { z } from "zod";
import { dataSchemes } from "./_schema";
import { showToast } from "@/core/helperx/toast";

const RawResponseSchema = z.object({
  HasError: z.boolean().catch(false),
  Message: z.string().nullable().optional(),
  ValidationErrors: dataSchemes.record(),
  Data: z.any().nullable().optional(),
});
export type RawResponse = z.infer<typeof RawResponseSchema>;

export const ResponseSchema = RawResponseSchema.transform((raw) => ({
  hasError: raw.HasError,
  message: raw.Message,
  validationErrors: raw.ValidationErrors,
  data: raw.Data,
}));
export type Response = z.infer<typeof ResponseSchema>;

/* #region Helpers */
export function parseResponse(raw: MyAny): Response {
  return ResponseSchema.parse(raw);
}

export function parseResponseWithCheck(
  raw?: MyAny | null,
  options?: { isOkeyNoti?: boolean },
): Response {
  if (!raw) {
    showToast({ message: "Beklenmedik bir sorun oluştu." });
    return parseResponse({ hasError: true });
  } else if (raw.HasError === true && raw.Message !== "-") {
    showToast({ message: raw.Message });
    return parseResponse({ hasError: true });
  }

  if (options?.isOkeyNoti && raw.Message !== "-") {
    showToast({ type: "success", message: raw.Message });
  }
  return parseResponse(raw);
}

export function getValid(model: Response, key: string): string | null {
  try {
    return model.validationErrors?.[key];
  } catch {
    return null;
  }
}
/* #endregion */
