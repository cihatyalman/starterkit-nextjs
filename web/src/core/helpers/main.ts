import z from "zod";
import { showToast } from "../helperx/toast";

export async function delay(duration: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/*";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function getDeviceInfo(
  type: "device" | "platform",
): MyDevice | MyPLatform {
  const ua = navigator.userAgent.toLowerCase();

  let device: MyDevice = "desktop";
  let platfrom: MyPLatform = "android";

  // Cihaz tipi
  if (/mobile|iphone|ipod|android.*mobile/.test(ua)) {
    device = "mobile";
  } else if (/ipad|tablet|android/.test(ua)) {
    device = "tablet";
  } else {
    device = "desktop";
  }

  // Platform
  if (/android/.test(ua)) platfrom = "android";
  else if (/iphone|ipad|ipod/.test(ua)) platfrom = "ios";
  else if (/win/.test(ua)) platfrom = "windows";
  else if (/mac/.test(ua)) platfrom = "mac";
  else if (/linux/.test(ua)) platfrom = "linux";

  const result = type === "platform" ? platfrom : device;
  return result;
}

export const getRandomImageUrl = (): string => {
  const id = Math.floor(Math.random() * 1000);
  const width = Math.floor(Math.random() * 1000) + 600;
  const height = Math.floor(Math.random() * 1000) + 400;

  return `https://picsum.photos/id/${id}/${width}/${height}`;
};

export const zodIssues = (issues: z.core.$ZodIssue[]) => {
  if (issues.length > 0) showToast({ message: issues[0].message });
};

export function parseData<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
): T | undefined {
  const parse = schema.safeParse(data);
  if (parse.success) return parse.data;
  if (parse.error.issues.length > 0)
    showToast({ message: parse.error.issues[0].message });
  return undefined;
}

export function cleanData(rawData: MyAny, checkNull = true) {
  const newData = Object.fromEntries(
    Object.entries(rawData).filter(([value]) => {
      if (value === undefined) return false;
      else if (checkNull && value === null) return false;
      return true;
    }),
  );
  return newData;
}

/* #region get UI Data */

/* #endregion */
