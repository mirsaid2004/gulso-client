const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

// With mocking on, requests go to the app's own origin so the MSW handlers
// catch them wherever it is deployed. Netlify exposes the site origin as URL
// on the server; the browser uses window.location.
function resolveApiBaseUrl() {
  if (!isMockingEnabled && process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.URL || "http://localhost:3000";
}

export const CONFIG = {
  API_BASE_URL: resolveApiBaseUrl(),
};
