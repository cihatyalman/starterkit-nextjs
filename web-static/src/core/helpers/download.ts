export function handlePublicDownload(path: string, fileName?: string) {
  const mainPath = process.env.NEXT_PUBLIC_BASE_PATH + path;
  fileName ??= mainPath.split("/").pop();
  const link = document.createElement("a");
  link.href = mainPath;
  link.download = fileName ?? "download";
  link.click();
}

export async function handleRemoteDownload(
  remoteUrl: string,
  fileName?: string
) {
  fileName ??= remoteUrl.split("/").pop();
  const response = await fetch(remoteUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  handlePublicDownload(url, fileName);
  window.URL.revokeObjectURL(url);
}
