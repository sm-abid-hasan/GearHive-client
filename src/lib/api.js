
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");


let savedToken = { value: null, expiresAt: 0 };

export function clearAccessToken() {
  savedToken = { value: null, expiresAt: 0 };
}

export async function getAccessToken({ forceNew = false } = {}) {
  if (!forceNew && savedToken.value && Date.now() < savedToken.expiresAt) {
    return savedToken.value;
  }

  const response = await fetch("/api/token", { cache: "no-store", credentials: "same-origin" });
  if (!response.ok) {
    clearAccessToken();
    throw new ApiError("Your session has expired. Please log in again.", 401);
  }

  const data = await response.json();
  savedToken = { value: data.token, expiresAt: data.expiresAt };
  return data.token;
}


export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}


export function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  });
  const text = search.toString();
  return text ? `?${text}` : "";
}


export async function apiFetch(path, { method = "GET", body, auth = false } = {}) {
  const send = async (forceNewToken) => {
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (auth) headers.Authorization = `Bearer ${await getAccessToken({ forceNew: forceNewToken })}`;

    return fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  };

  let response;
  try {
    response = await send(false);

   
    if (response.status === 401 && auth) {
      response = await send(true);
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Could not reach the server. Please check your internet and try again.", 0);
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null; 
  }

  if (!response.ok) {
    throw new ApiError(data?.message || "Something went wrong. Please try again.", response.status);
  }

  return data;
}
