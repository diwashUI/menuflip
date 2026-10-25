"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import MenuView from "@/components/MenuView";
import QrCard from "@/components/QrCard";
import { getMenu } from "@/lib/storage";
import { isPro } from "@/lib/pro";
import { buildMenuUrl } from "@/lib/qr";
import type { Menu } from "@/lib/menu";

export default function MenuClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [menu, setMenu] = useState<Menu | null | undefined>(undefined);
  const [pro, setPro] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMenu(getMenu(slug) ?? null);
    setPro(isPro());
  }, [slug]);

  if (menu === undefined) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center text-slate-500">
        Loading menu…
      </div>
    );
  }

  if (menu === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Menu not found on this device</h1>
        <p className="mt-3 leading-relaxed text-slate-600">
          Menus are saved in the browser they were created in, so a menu made on
          another device does not open here yet. Cloud menus are on the roadmap
          — for now, create your own in about 5 minutes.
        </p>
        <Link
          href="/create"
          className="mt-6 inline-block rounded-full bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
        >
          Make my own menu
        </Link>
      </div>
    );
  }

  const url = buildMenuUrl(window.location.origin, menu.slug);

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <MenuView menu={menu} showBadge={!pro} />
      <div className="mt-6">
        <QrCard url={url} restaurantName={menu.name} canCustomize={pro} />
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
            }
          }}
          className="mt-4 w-full rounded-full border border-slate-300 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {copied ? "Link copied!" : "Copy menu link"}
        </button>
      </div>
    </div>
  );
}
