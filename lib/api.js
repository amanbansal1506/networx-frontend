/** Client-side API wrapper for the reconstructed Express backend. */
const origin = process.env.NEXT_PUBLIC_HOST_IP || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_ORIGIN = origin.replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function api(path, { body, headers, ...options } = {}) {
  const target = `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
  let response;
  try {
    response = await fetch(target, {
      ...options,
      credentials: "include",
      cache: "no-store",
      headers: { ...(body !== undefined ? { "Content-Type": "application/json" } : {}), ...headers },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ApiError(`Can't reach NetworX API at ${API_ORIGIN}. Make sure the backend is running.`, 0);
  }
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new ApiError(`The server returned a non-JSON response (${response.status}). Check the API URL.`, response.status);
  }
  let data;
  try { data = await response.json(); }
  catch { throw new ApiError("The server returned invalid JSON.", response.status); }
  if (!response.ok || data?.success === false) {
    throw new ApiError(data?.message || data?.error || `Request failed (${response.status})`, response.status);
  }
  return data;
}

export const urls = {
  profile: (username) => `/profile/${encodeURIComponent(username || "me")}`,
  userApi: (username) => `/api/users/${encodeURIComponent(username)}`,
};
