// Thin fetch wrapper for the local API.
export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${url}`, {
      method,
      headers: body !== undefined ? { "content-type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Cannot reach the local server. Is the GATE Tutor window still open?");
  }
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }
  if (!res.ok) throw new ApiError(res.status, data?.error ?? `Request failed (${res.status})`);
  return data as T;
}

export const api = {
  get: <T = any>(url: string) => request<T>("GET", url),
  post: <T = any>(url: string, body: unknown = {}) => request<T>("POST", url, body),
  put: <T = any>(url: string, body: unknown = {}) => request<T>("PUT", url, body),
  del: <T = any>(url: string) => request<T>("DELETE", url),
  async upload<T = any>(url: string, file: File): Promise<T> {
    const res = await fetch(`/api${url}`, { method: "POST", headers: { "content-type": "application/octet-stream" }, body: file });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(res.status, data?.error ?? "Upload failed");
    return data as T;
  },
};
