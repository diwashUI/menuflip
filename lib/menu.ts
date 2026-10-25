// Menu data model — pure functions, fully unit-tested in menu.test.ts.

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  veg: boolean;
  spicy: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Menu {
  slug: string;
  name: string;
  tagline: string;
  whatsapp: string;
  currency: "NPR" | "USD";
  categories: MenuCategory[];
  createdAt: string;
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

/** "Brewmandu Coffee Co." -> "brewmund-coffee-co". Empty input -> "menu". */
export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "menu";
}

/**
 * Returns a slug that does not collide with any slug in `existing`.
 * First try the plain slug, then slug-2, slug-3, ...
 */
export function generateSlug(name: string, existing: string[]): string {
  const base = slugify(name);
  if (!existing.includes(base)) return base;
  let n = 2;
  while (existing.includes(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

/**
 * Formats a price for display. NPR renders as "Rs 250", USD as "$4.50".
 * Non-finite or negative values render as "—" (validation rejects them
 * before publish, but display never crashes on bad data).
 */
export function formatPrice(price: number, currency: "NPR" | "USD"): string {
  if (!Number.isFinite(price) || price < 0) return "—";
  if (currency === "NPR") {
    return `Rs ${Number.isInteger(price) ? price : price.toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
}

/** Price input rules: a number, >= 0, at most 2 decimal places, < 1,000,000. */
export function isValidPrice(price: number): boolean {
  if (!Number.isFinite(price) || price < 0 || price >= 1_000_000) return false;
  return Math.round(price * 100) / 100 === price;
}

/**
 * Validates a menu for publishing. Returns a list of human-readable errors;
 * an empty list means the menu is publishable.
 */
export function validateMenu(menu: Menu): string[] {
  const errors: string[] = [];
  if (!menu.name.trim()) errors.push("Restaurant name is required.");
  if (menu.categories.length === 0) {
    errors.push("Add at least one category.");
  }
  for (const category of menu.categories) {
    if (!category.name.trim()) {
      errors.push("Every category needs a name.");
    }
    if (category.items.length === 0) {
      errors.push(`Category "${category.name || "unnamed"}" has no items.`);
    }
    for (const item of category.items) {
      if (!item.name.trim()) {
        errors.push("Every item needs a name.");
      }
      if (!isValidPrice(item.price)) {
        errors.push(`Item "${item.name || "unnamed"}" needs a valid price.`);
      }
    }
  }
  if (menu.whatsapp && !/^[0-9+\s-]{7,20}$/.test(menu.whatsapp)) {
    errors.push("WhatsApp number looks invalid — digits only, 7–20 characters.");
  }
  return errors;
}

export function createEmptyMenu(): Menu {
  // Deterministic on purpose: this runs during prerender of /create, so no
  // randomUUID() or Date() here. Real ids come from addCategory/addItem
  // (event handlers, post-mount), and createdAt is stamped at publish time.
  return {
    slug: "",
    name: "",
    tagline: "",
    whatsapp: "",
    currency: "NPR",
    categories: [
      {
        id: "cat-default",
        name: "Coffee",
        items: [{ id: "item-default", name: "", price: 0, description: "", veg: false, spicy: false }],
      },
    ],
    createdAt: "",
  };
}

export function createSampleMenu(): Menu {
  return {
    slug: "brewmund-coffee",
    name: "Brewmandu Coffee Co.",
    tagline: "Small-batch coffee, baked fresh every morning.",
    whatsapp: "9800000000",
    currency: "NPR",
    categories: [
      {
        id: "c1",
        name: "Coffee",
        items: [
          { id: "i1", name: "Espresso", price: 150, description: "Double shot, rich and bold.", veg: true, spicy: false },
          { id: "i2", name: "Cappuccino", price: 250, description: "Espresso, steamed milk, thick foam.", veg: true, spicy: false },
          { id: "i3", name: "Iced Latte", price: 300, description: "Cold milk over a double shot, served over ice.", veg: true, spicy: false },
        ],
      },
      {
        id: "c2",
        name: "Breakfast",
        items: [
          { id: "i4", name: "Avocado Toast", price: 350, description: "Sourdough, smashed avocado, chili flakes.", veg: true, spicy: true },
          { id: "i5", name: "Banana Pancakes", price: 320, description: "Three fluffy pancakes, honey, banana.", veg: true, spicy: false },
        ],
      },
    ],
    createdAt: "2026-10-25T00:00:00.000Z",
  };
}
