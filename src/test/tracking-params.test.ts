import { describe, expect, it } from "vitest";
import { appendTrackingParams, pickTrackingParams } from "@/lib/tracking-params";

describe("repasse de UTMs ao checkout", () => {
  it("lê os 8 parâmetros de rastreamento da URL e ignora os outros", () => {
    const picked = pickTrackingParams(
      "?utm_source=fb&utm_medium=cpc&utm_campaign=c1&utm_term=t&utm_content=ad1&sck=s1&fbclid=abc&src=x&other=1",
    );
    expect(picked).toEqual({
      utm_source: "fb",
      utm_medium: "cpc",
      utm_campaign: "c1",
      utm_term: "t",
      utm_content: "ad1",
      sck: "s1",
      fbclid: "abc",
      src: "x",
    });
  });

  it("sem parâmetros o link fica igual", () => {
    expect(appendTrackingParams("https://pay.cakto.com.br/pek2fcn", {})).toBe("https://pay.cakto.com.br/pek2fcn");
  });

  it("anexa os parâmetros ao link do checkout", () => {
    expect(appendTrackingParams("https://pay.cakto.com.br/pek2fcn", { utm_source: "fb", fbclid: "abc" })).toBe(
      "https://pay.cakto.com.br/pek2fcn?utm_source=fb&fbclid=abc",
    );
  });

  it("preserva parâmetros que o link já tem", () => {
    expect(appendTrackingParams("https://pay.cakto.com.br/x?coupon=A&src=orig", { src: "new", sck: "s" })).toBe(
      "https://pay.cakto.com.br/x?coupon=A&src=orig&sck=s",
    );
  });
});
