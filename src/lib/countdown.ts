export const OFFER_DURATION_MS = 3 * 60 * 60 * 1000;
export const OFFER_STORAGE_KEY = "mega-pack-oferta-fin";

/** Returns a valid end timestamp: the stored one if still in the future, else now + 3h. */
export function resolveOfferEnd(stored: string | null, now: number): number {
  const parsed = stored ? Number(stored) : NaN;
  if (Number.isFinite(parsed) && parsed > now && parsed - now <= OFFER_DURATION_MS) {
    return parsed;
  }
  return now + OFFER_DURATION_MS;
}

export function splitRemaining(ms: number): { h: string; m: string; s: string } {
  const total = Math.max(0, Math.floor(ms / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(total / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
  };
}
