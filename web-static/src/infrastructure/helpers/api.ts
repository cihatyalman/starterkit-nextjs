import { showToast } from "../helperx/toast";

/**
- Interceptor ile hata denetimi yapılabilir.
- buildHeaders ile her istekte header otomatikleştirilebilir.
*/

/* #region Interceptor */
const interceptor = async (response: Response): Promise<Response | null> => {
  // Buraya denetleyici kodlar yazılabilir.
  // return olarak null dönülürse kod durur, response dönülürse kod devam eder.
  return response;
};
/* #endregion */

/* #region Interface */

interface BaseOptions {
  params?: MyRecord;
  headers?: HeadersInit;
}

interface GetOptions extends BaseOptions {
  cache?: RequestCache;
}

interface PostOptions extends BaseOptions {
  body?: MyAny;
}

interface FileOptions extends BaseOptions {
  uploadPath?: string;
}
/* #endregion */

/* #region All Request Types */
const get = async (path: string, options: GetOptions = {}) => {
  const isServer = typeof window === "undefined";

  const fullUrl = buildUrl(path, options.params);
  const requestInit: RequestInit = {
    method: "GET",
    cache: options.cache || (isServer ? undefined : "no-store"),
    headers: { ...(options.headers || {}) },
  };

  return apiFetch(fullUrl, requestInit);
};

const post = (path: string, opts?: PostOptions) => request("POST", path, opts);
const put = (path: string, opts?: PostOptions) => request("PUT", path, opts);
const patch = (path: string, opts?: PostOptions) =>
  request("PATCH", path, opts);
const del = (path: string, opts?: PostOptions) => request("DELETE", path, opts);

async function filePost(path: string, file: File, options: FileOptions = {}) {
  const formData = new FormData();
  formData.append("file", file);
  if (options.uploadPath) formData.append("UploadPath", options.uploadPath);
  const fullUrl = buildUrl(path);
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      ...(options.headers || {}),
    },
    body: formData,
  };

  try {
    return apiFetch(fullUrl, requestInit);
  } catch {
    return null;
  }
}
/* #endregion */

export const apiService = {
  get: get,
  post: post,
  put: put,
  patch: patch,
  delete: del,
  filePost: filePost,
};

async function request(
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  options: PostOptions = { body: {} },
) {
  const fullUrl = buildUrl(path, options.params);
  const requestInit: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: JSON.stringify(options.body),
  };

  return apiFetch(fullUrl, requestInit);
}

function buildUrl(path: string, params?: MyRecord) {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}?${buildParams(params)}`;
}

function buildParams(params?: MyRecord) {
  const searchParams = new URLSearchParams({ platform: "web" });

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    // Array
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
      return;
    }

    // Object (nested)
    if (typeof value === "object") {
      searchParams.append(key, JSON.stringify(value));
      return;
    }

    // Primitive
    searchParams.append(key, String(value));
  });

  return searchParams.toString();
}

function buildHeaders() {
  const headers: Record<string, string> = {};

  // Header burada düzenlenebilir.

  return headers;
}

async function apiFetch(
  fullUrl: string,
  options: RequestInit,
): Promise<MyAny | null> {
  /* #region Request oluşturuldu. */
  const makeRequest = () =>
    fetch(fullUrl, {
      ...options,
      headers: {
        ...buildHeaders(), // <-- sıfırdan oluştur
        ...(options.headers || {}),
      },
      // credentials: "include", // RT cookie için
    });
  /* #endregion */

  /* #region Request yapıldı. */
  let response: Response;
  try {
    response = await makeRequest();
  } catch (err) {
    console.error(`[C_err]: `, err);
    return null;
  }
  if (response.ok) return await response.json();
  /* #endregion */

  /* #region Interceptor */
  const r = await interceptor(response);
  if (r === null) return null;
  /* #endregion */

  /* #region Varsayılan hata kontrolü */
  let msg = null;
  switch (response.status) {
    case 403:
      msg = "Erişim engellendi.";
      break;
    case 413:
      msg = "İçerik boyutu çok yüksek.";
      break;
    case 500:
      msg = "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
      break;
    default:
      msg = `Beklenmeyen bir hata oluştu (Kod: ${response.status})`;
  }
  if (msg !== null) showToast({ message: msg });
  /* #endregion */

  return null;
}
