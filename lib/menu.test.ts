import { describe, expect, it } from "vitest";
import {
  createEmptyMenu,
  createSampleMenu,
  formatPrice,
  generateSlug,
  isValidPrice,
  slugify,
  validateMenu,
  type Menu,
} from "./menu";

describe("slugify", () => {
  it("lowercases and hyphenates a normal name", () => {
    expect(slugify("Brewmandu Coffee Co.")).toBe("brewmandu-coffee-co");
  });
  it("collapses repeated separators", () => {
    expect(slugify("Cafe   Soma & Bakery!")).toBe("cafe-soma-bakery");
  });
  it("trims leading and trailing dashes", () => {
    expect(slugify("  --Momo House-- ")).toBe("momo-house");
  });
  it("falls back to 'menu' for empty or symbol-only input", () => {
    expect(slugify("")).toBe("menu");
    expect(slugify("!!!")).toBe("menu");
  });
  it("keeps digits", () => {
    expect(slugify("Cafe 24 Hours")).toBe("cafe-24-hours");
  });
});

describe("generateSlug", () => {
  it("returns the plain slug when free", () => {
    expect(generateSlug("BIA Cafe", [])).toBe("bia-cafe");
  });
  it("appends -2 on collision", () => {
    expect(generateSlug("BIA Cafe", ["bia-cafe"])).toBe("bia-cafe-2");
  });
  it("increments past multiple collisions", () => {
    expect(generateSlug("BIA Cafe", ["bia-cafe", "bia-cafe-2", "bia-cafe-3"])).toBe(
      "bia-cafe-4",
    );
  });
});

describe("formatPrice", () => {
  it("formats NPR as Rs with no decimals for whole amounts", () => {
    expect(formatPrice(250, "NPR")).toBe("Rs 250");
  });
  it("formats NPR with decimals when needed", () => {
    expect(formatPrice(199.5, "NPR")).toBe("Rs 199.50");
  });
  it("formats USD with two decimals", () => {
    expect(formatPrice(4.5, "USD")).toBe("$4.50");
  });
  it("never crashes on bad data", () => {
    expect(formatPrice(NaN, "NPR")).toBe("—");
    expect(formatPrice(-5, "USD")).toBe("—");
  });
});

describe("isValidPrice", () => {
  it("accepts zero and normal prices", () => {
    expect(isValidPrice(0)).toBe(true);
    expect(isValidPrice(250)).toBe(true);
    expect(isValidPrice(19.99)).toBe(true);
  });
  it("rejects negatives, NaN, and more than 2 decimals", () => {
    expect(isValidPrice(-1)).toBe(false);
    expect(isValidPrice(NaN)).toBe(false);
    expect(isValidPrice(10.999)).toBe(false);
  });
  it("rejects absurd values", () => {
    expect(isValidPrice(1_000_000)).toBe(false);
  });
});

describe("validateMenu", () => {
  const base: Menu = createSampleMenu();

  it("accepts the sample menu", () => {
    expect(validateMenu(base)).toEqual([]);
  });
  it("requires a restaurant name", () => {
    expect(validateMenu({ ...base, name: "  " })).toContain(
      "Restaurant name is required.",
    );
  });
  it("requires at least one category", () => {
    expect(validateMenu({ ...base, categories: [] })).toContain(
      "Add at least one category.",
    );
  });
  it("flags an empty category", () => {
    const menu: Menu = { ...base, categories: [{ id: "x", name: "Drinks", items: [] }] };
    expect(validateMenu(menu)).toContain('Category "Drinks" has no items.');
  });
  it("flags an unnamed item and a bad price", () => {
    const menu: Menu = {
      ...base,
      categories: [
        {
          id: "x",
          name: "Drinks",
          items: [{ id: "y", name: "", price: -5, description: "", veg: false, spicy: false }],
        },
      ],
    };
    const errors = validateMenu(menu);
    expect(errors).toContain("Every item needs a name.");
    expect(errors.some((e) => e.includes("needs a valid price"))).toBe(true);
  });
  it("flags a malformed WhatsApp number but allows empty", () => {
    expect(validateMenu({ ...base, whatsapp: "abc" }).length).toBeGreaterThan(0);
    expect(validateMenu({ ...base, whatsapp: "" })).toEqual([]);
  });
});

describe("createEmptyMenu", () => {
  it("starts with one category and one blank item", () => {
    const menu = createEmptyMenu();
    expect(menu.categories).toHaveLength(1);
    expect(menu.categories[0].items).toHaveLength(1);
    expect(menu.currency).toBe("NPR");
  });
});
