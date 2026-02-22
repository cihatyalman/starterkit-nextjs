// Kalıcı, Kullanıcı geçmişi silene kadar kalır
type LocalStorageKey = "GeneralApiTime" | "CityList";

function get<T>(key: LocalStorageKey): T | null {
  const res = localStorage.getItem(key);
  if (res) return JSON.parse(res) as T;
  return null;
}

function set<T>(key: LocalStorageKey, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function deleteByKey(key: LocalStorageKey): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function clear(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch {
    return false;
  }
}

export const localStorageService = {
  get: get,
  set: set,
  delete: deleteByKey,
  clear: clear,
};
