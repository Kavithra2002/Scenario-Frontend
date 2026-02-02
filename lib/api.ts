/**
 * Backend API base URL. Set NEXT_PUBLIC_API_URL in .env.local (see env.example).
 * Falls back to relative /api when unset (for Next.js API routes or proxy).
 */
export function getApiUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
  }
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

/**
 * Full URL for a backend API path (e.g. "/api/authorizer/tasks").
 * Path should start with /.
 */
export function apiUrl(path: string): string {
  const base = getApiUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base.replace(/\/$/, "")}${p}` : p;
}

/**
 * Fetch from the scenario-backend. Use apiUrl() for the URL.
 * Example: fetch(apiUrl("/api/authorizer/tasks"))
 */
export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = apiUrl(path);
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
