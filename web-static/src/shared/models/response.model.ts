import { z } from "zod";
import { dataSchemes } from "./_schema";
import { showToast } from "@/core/helperx/toast";

const RawResponseSchema = z.object({
  hasError: z.boolean().catch(false),
  message: z.string().nullable().optional(),
  validationErrors: dataSchemes.record(),
  data: z.any().nullable().optional(),
});
export type RawResponse = z.infer<typeof RawResponseSchema>;

export const ResponseSchema = RawResponseSchema.transform((raw) => ({
  hasError: raw.hasError,
  message: raw.message,
  validationErrors: raw.validationErrors,
  data: raw.data,
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
  } else if (raw.hasError === true && raw.message !== "-") {
    showToast({ message: raw.message });
    return parseResponse({ hasError: true });
  }

  if (options?.isOkeyNoti && raw.message !== "-") {
    showToast({ type: "success", message: raw.message });
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
