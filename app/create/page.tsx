"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MenuView from "@/components/MenuView";
import QrCard from "@/components/QrCard";
import ProCheckoutButton from "@/components/ProCheckoutButton";
import {
  createEmptyMenu,
  createSampleMenu,
  generateSlug,
  newId,
  validateMenu,
  type Menu,
} from "@/lib/menu";
import { buildMenuUrl } from "@/lib/qr";
import { deleteMenu, getMenu, listMenus, saveMenu } from "@/lib/storage";
import { isPro } from "@/lib/pro";
import { FREE_MAX_MENUS } from "@/lib/config";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none";

export default function CreatePage() {
  const [menu, setMenu] = useState<Menu>(() => createEmptyMenu());
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saved, setSaved] = useState<Menu[]>([]);
  const [pro, setPro] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [published, setPublished] = useState<Menu | null>(null);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setSaved(listMenus());
    setPro(isPro());
  }, []);

  const update = (patch: Partial<Menu>) => {
    setMenu((m) => ({ ...m, ...patch }));
    setPublished(null);
  };

  const updateCategory = (id: string, patch: Partial<Menu["categories"][number]>) => {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
    setPublished(null);
  };

  const updateItem = (
    categoryId: string,
    itemId: string,
    patch: Partial<Menu["categories"][number]["items"][number]>,
  ) => {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) }
          : c,
      ),
    }));
    setPublished(null);
  };

  const addCategory = () =>
    setMenu((m) => ({
      ...m,
      categories: [...m.categories, { id: newId(), name: "", items: [] }],
    }));

  const addItem = (categoryId: string) =>
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: [
                ...c.items,
                { id: newId(), name: "", price: 0, description: "", veg: false, spicy: false },
              ],
            }
          : c,
      ),
    }));

  const publish = () => {
    const problems = validateMenu(menu);
    if (problems.length > 0) {
      setErrors(problems);
      return;
    }
    setErrors([]);

    const isNew = editingSlug === null;
    if (isNew && !pro && saved.length >= FREE_MAX_MENUS) {
      setErrors([
        `Free plan allows ${FREE_MAX_MENUS} menu. Upgrade to Pro for unlimited menus.`,
      ]);
      return;
    }

    const otherSlugs = saved.map((m) => m.slug).filter((s) => s !== editingSlug);
    const slug = editingSlug ?? generateSlug(menu.name, otherSlugs);
    const finalMenu: Menu = {
      ...menu,
      slug,
      createdAt: menu.createdAt || new Date().toISOString(),
    };
    try {
      saveMenu(finalMenu);
    } catch {
      setErrors(["Could not save this menu in this browser. Try freeing up storage."]);
      return;
    }
    setSaved(listMenus());
    setEditingSlug(slug);
    setPublished(finalMenu);
    setNotice("Menu published!");
  };

  const loadForEdit = (slug: string) => {
    const found = getMenu(slug);
    if (!found) return;
    setMenu(found);
    setEditingSlug(slug);
    setPublished(null);
    setErrors([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeSaved = (slug: string) => {
    deleteMenu(slug);
    setSaved(listMenus());
    if (editingSlug === slug) {
      setEditingSlug(null);
      setMenu(createEmptyMenu());
    }
    if (published?.slug === slug) setPublished(null);
  };

  const menuUrl = published
    ? buildMenuUrl(window.location.origin, published.slug)
    : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Create your menu</h1>
      <p className="mt-2 text-slate-600">
        Fill in your menu on the left — the phone preview on the right updates as you type.
      </p>

      {published && (
        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-6">
          <p className="font-semibold text-teal-900">{notice} Your menu is live at:</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link href={`/m/${published.slug}`} className="break-all font-medium text-teal-700 underline">
              {menuUrl}
            </Link>
            <button
              type="button"
              onClick={copyLink}
              className="rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link
              href={`/m/${published.slug}`}
              className="rounded-full border border-teal-600 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-white"
            >
              View menu
            </Link>
          </div>
          <div className="mx-auto mt-6 max-w-sm">
            <QrCard url={menuUrl} restaurantName={published.name} canCustomize={pro} />
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-800">Fix these before publishing:</p>
          <ul className="mt-1 list-inside list-disc text-sm text-red-700">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          {errors.some((e) => e.includes("Free plan")) && (
            <div className="mt-3">
              <ProCheckoutButton className="rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700" />
            </div>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">Restaurant details</h2>
            <div className="mt-4 space-y-4">
              <Field label="Restaurant name">
                <input
                  className={inputCls}
                  value={menu.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="e.g. BIA Cafe"
                />
              </Field>
              <Field label="Tagline (optional)">
                <input
                  className={inputCls}
                  value={menu.tagline}
                  onChange={(e) => update({ tagline: e.target.value })}
                  placeholder="e.g. Fresh bakes, honest coffee"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="WhatsApp number (optional)">
                  <input
                    className={inputCls}
                    value={menu.whatsapp}
                    onChange={(e) => update({ whatsapp: e.target.value })}
                    placeholder="9800000000"
                  />
                </Field>
                <Field label="Currency">
                  <select
                    className={inputCls}
                    value={menu.currency}
                    onChange={(e) => update({ currency: e.target.value as "NPR" | "USD" })}
                  >
                    <option value="NPR">Rs (NPR)</option>
                    <option value="USD">$ (USD)</option>
                  </select>
                </Field>
              </div>
            </div>
          </div>

          {menu.categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <input
                  className={`${inputCls} font-semibold`}
                  value={category.name}
                  onChange={(e) => updateCategory(category.id, { name: e.target.value })}
                  placeholder="Category name, e.g. Coffee"
                />
                <button
                  type="button"
                  onClick={() =>
                    setMenu((m) => ({ ...m, categories: m.categories.filter((c) => c.id !== category.id) }))
                  }
                  className="shrink-0 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {category.items.map((item) => (
                  <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                    <div className="grid grid-cols-[1fr_110px] gap-3">
                      <input
                        className={inputCls}
                        value={item.name}
                        onChange={(e) => updateItem(category.id, item.id, { name: e.target.value })}
                        placeholder="Item name, e.g. Cappuccino"
                      />
                      <input
                        className={inputCls}
                        type="number"
                        min="0"
                        step="0.01"
                        value={Number.isNaN(item.price) ? "" : item.price}
                        onChange={(e) =>
                          updateItem(category.id, item.id, {
                            price: e.target.value === "" ? NaN : parseFloat(e.target.value),
                          })
                        }
                        placeholder="Price"
                        aria-label="Price"
                      />
                    </div>
                    <input
                      className={`${inputCls} mt-3`}
                      value={item.description}
                      onChange={(e) => updateItem(category.id, item.id, { description: e.target.value })}
                      placeholder="Description (optional)"
                    />
                    <div className="mt-3 flex items-center gap-5 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.veg}
                          onChange={(e) => updateItem(category.id, item.id, { veg: e.target.checked })}
                        />
                        Veg
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.spicy}
                          onChange={(e) => updateItem(category.id, item.id, { spicy: e.target.checked })}
                        />
                        Spicy
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateCategory(category.id, {
                            items: category.items.filter((i) => i.id !== item.id),
                          })
                        }
                        className="ml-auto font-medium text-red-600 hover:text-red-800"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addItem(category.id)}
                className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                + Add item
              </button>
            </div>
          ))}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addCategory}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              + Add category
            </button>
            <button
              type="button"
              onClick={() => {
                setMenu(createSampleMenu());
                setEditingSlug(null);
                setPublished(null);
              }}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Load sample menu
            </button>
            <button
              type="button"
              onClick={publish}
              className="rounded-full bg-teal-600 px-6 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              {editingSlug ? "Save changes" : "Publish menu"}
            </button>
          </div>

          {saved.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-semibold text-slate-900">My menus (on this device)</h2>
              <ul className="mt-3 space-y-2">
                {saved.map((m) => (
                  <li key={m.slug} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-800">{m.name}</span>
                    <span className="flex gap-3">
                      <button type="button" onClick={() => loadForEdit(m.slug)} className="font-medium text-teal-700 hover:text-teal-900">
                        Edit
                      </button>
                      <Link href={`/m/${m.slug}`} className="font-medium text-slate-600 hover:text-slate-900">
                        View
                      </Link>
                      <button type="button" onClick={() => removeSaved(m.slug)} className="font-medium text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Live phone preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <p className="mb-3 text-center text-sm font-medium text-slate-500">
            Live preview — exactly what customers see
          </p>
          <div className="mx-auto max-w-sm rounded-[2rem] border-8 border-slate-900 bg-slate-900 p-1 shadow-xl">
            <div className="max-h-[70vh] overflow-y-auto rounded-[1.5rem]">
              <MenuView menu={menu} showBadge={!pro} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
