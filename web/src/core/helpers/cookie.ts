export function getCookie(name: string): string | null {
  const prefix = name + "=";

  const cookie = document.cookie.split("; ").find((c) => c.startsWith(prefix));
  if (!cookie) return null;

  const value = cookie.substring(prefix.length);

  try {
    return decodeURIComponent(value);
  } catch {
    return value; // decode bozulursa ham değeri döner
  }
}
