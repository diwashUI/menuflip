import { describe, expect, it } from "vitest";
import { buildMenuUrl, buildWhatsAppUrl } from "./qr";

describe("buildMenuUrl", () => {
  it("joins origin and slug", () => {
    expect(buildMenuUrl("https://menuflipapp.vercel.app", "bia-cafe")).toBe(
      "https://menuflipapp.vercel.app/m/bia-cafe",
    );
  });
  it("strips trailing slashes from the origin", () => {
    expect(buildMenuUrl("https://example.com///", "momo-house")).toBe(
      "https://example.com/m/momo-house",
    );
  });
  it("URL-encodes unusual slugs", () => {
    expect(buildMenuUrl("https://example.com", "cafe & bar")).toBe(
      "https://example.com/m/cafe%20%26%20bar",
    );
  });
  it("throws on an empty slug", () => {
    expect(() => buildMenuUrl("https://example.com", "  ")).toThrow();
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with an order message", () => {
    const url = buildWhatsAppUrl("980 123 4567", "BIA Cafe");
    expect(url).toContain("https://wa.me/9801234567?text=");
    expect(url).toContain("BIA%20Cafe");
  });
  it("returns null when no usable number is set", () => {
    expect(buildWhatsAppUrl("", "BIA Cafe")).toBeNull();
    expect(buildWhatsAppUrl("123", "BIA Cafe")).toBeNull();
  });
});
