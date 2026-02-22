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

/* #region get UI Data */

/* #endregion */
