import { appendTrackingParams, pickTrackingParams, readStoredTrackingParams } from "@/lib/tracking-params";

export type Pack = {
  id: "basico" | "familiar" | "mega";
  name: string;
  checkoutUrl: string;
  price: number;
  originalPrice?: number;
  featured?: boolean;
};

export const PACKS: Pack[] = [
  {
    id: "basico",
    name: "Pack Básico – 5 Libros de Aventuras Bíblicas Infantiles",
    checkoutUrl: "https://pay.cakto.com.br/br4xps4_1331578",
    price: 7.99,
  },
  {
    id: "familiar",
    name: "Pack Familiar – 7 Colecciones Bíblicas Infantiles",
    checkoutUrl: "https://pay.cakto.com.br/fcwgj4g",
    price: 10.99,
  },
  {
    id: "mega",
    name: "Mega Pack – 9 Materiales Bíblicos Infantiles",
    checkoutUrl: "https://pay.cakto.com.br/pek2fcn",
    price: 14.99,
    originalPrice: 39.99,
    featured: true,
  },
];

export function getPack(id: Pack["id"]): Pack {
  const pack = PACKS.find((p) => p.id === id);
  if (!pack) throw new Error(`Pack ${id} not found`);
  return pack;
}

export function formatUSD(value: number): string {
  return `$${value.toFixed(2)}`;
}

/**
 * Fires the Meta Pixel custom event and then opens the Cakto checkout.
 * InitiateCheckout / Purchase are intentionally NOT sent here: Cakto sends them.
 */
export function openCheckout(url: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "ClicouComprar");
  }
  const tracking = { ...readStoredTrackingParams(), ...pickTrackingParams(window.location.search) };
  const destination = appendTrackingParams(url, tracking);
  // Small delay so the pixel request leaves before the page unloads.
  window.setTimeout(() => {
    window.location.href = destination;
  }, 200);
}
