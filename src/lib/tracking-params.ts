export const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "sck",
  "fbclid",
  "src",
] as const;

export const TRACKING_STORAGE_KEY = "checkout-tracking-params";

export type TrackingParams = Partial<Record<(typeof TRACKING_KEYS)[number], string>>;

/** Picks the tracking parameters present (non-empty) in a query string. */
export function pickTrackingParams(search: string): TrackingParams {
  const params = new URLSearchParams(search);
  const picked: TrackingParams = {};
  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) picked[key] = value;
  }
  return picked;
}

/** Appends tracking params to a checkout URL, keeping every parameter it already has. */
export function appendTrackingParams(url: string, tracking: TrackingParams): string {
  const entries = Object.entries(tracking).filter(([, v]) => Boolean(v));
  if (entries.length === 0) return url;
  const target = new URL(url);
  for (const [key, value] of entries) {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value as string);
  }
  return target.toString();
}

/** On page load: stores the URL's tracking params in sessionStorage (merged over earlier ones). */
export function captureTrackingParams(): void {
  if (typeof window === "undefined") return;
  const fromUrl = pickTrackingParams(window.location.search);
  if (Object.keys(fromUrl).length === 0) return;
  const merged = { ...readStoredTrackingParams(), ...fromUrl };
  try {
    window.sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage unavailable (private mode): fall back to the live URL at click time.
  }
}

export function readStoredTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return pickTrackingParams(new URLSearchParams(parsed as Record<string, string>).toString());
  } catch {
    return {};
  }
}
