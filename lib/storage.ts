// Menu persistence v1 — localStorage only, by design.
//
// Menus live in the owner's browser. That keeps the app free to run (no
// database, no server costs) and honest: a menu saved on this device opens
// on this device. A shared link opened on another device shows a clear
// "menu not found on this device" state instead of a fake page.

import type { Menu } from "./menu";

const STORAGE_KEY = "menuflip_menus";

function readAll(): Record<string, Menu> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, Menu>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveMenu(menu: Menu): void {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    all[menu.slug] = menu;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Storage full or unavailable — the editor surfaces this as a save error.
    throw new Error("Could not save this menu in this browser.");
  }
}

export function getMenu(slug: string): Menu | null {
  return readAll()[slug] ?? null;
}

export function listMenus(): Menu[] {
  return Object.values(readAll()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function deleteMenu(slug: string): void {
  if (typeof window === "undefined") return;
  const all = readAll();
  delete all[slug];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Ignore — deletion failure leaves the old menu, never breaks the page.
  }
}
