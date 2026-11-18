import { describe, expect, it } from "vitest";
import { getPack } from "@/lib/packs";
import { OFFER_DURATION_MS, resolveOfferEnd, splitRemaining } from "@/lib/countdown";

describe("packs", () => {
  it("Pack Básico abre o checkout br4xps4_1331578", () => {
    expect(getPack("basico").checkoutUrl).toBe("https://pay.cakto.com.br/br4xps4_1331578");
  });
  it("Pack Familiar abre o checkout fcwgj4g", () => {
    expect(getPack("familiar").checkoutUrl).toBe("https://pay.cakto.com.br/fcwgj4g");
  });
  it("Mega Pack abre o checkout pek2fcn", () => {
    expect(getPack("mega").checkoutUrl).toBe("https://pay.cakto.com.br/pek2fcn");
  });
  it("Mega Pack sai de $39.99 por $14.99", () => {
    expect(getPack("mega").price).toBe(14.99);
    expect(getPack("mega").originalPrice).toBe(39.99);
  });
});

describe("contagem regressiva", () => {
  it("dura 3 horas", () => {
    expect(OFFER_DURATION_MS).toBe(10_800_000);
    expect(splitRemaining(OFFER_DURATION_MS)).toEqual({ h: "03", m: "00", s: "00" });
  });
  it("reinicia em 3 horas quando o prazo salvo já passou", () => {
    expect(resolveOfferEnd("1000", 5000)).toBe(5000 + OFFER_DURATION_MS);
  });
  it("mantém o prazo salvo enquanto ainda é válido", () => {
    expect(resolveOfferEnd(String(5000 + 60_000), 5000)).toBe(65_000);
  });
});
