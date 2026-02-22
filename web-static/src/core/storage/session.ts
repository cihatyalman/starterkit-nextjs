// Sekme bazlı, sekme kapanırsa silinir
type SessionStorageKey = "";

function get<T>(key: SessionStorageKey): T | null {
  const res = sessionStorage.getItem(key);
  if (res) return JSON.parse(res) as T;
  return null;
}

function set(key: SessionStorageKey, value: string): boolean {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function deleteByKey(key: SessionStorageKey): boolean {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function clear(): boolean {
  try {
    sessionStorage.clear();
    return true;
  } catch {
    return false;
  }
}

export const sessionStorageService = {
  get: get,
  set: set,
  delete: deleteByKey,
  clear: clear,
};
