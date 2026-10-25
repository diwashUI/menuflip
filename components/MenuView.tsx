import { formatPrice, type Menu } from "@/lib/menu";
import { buildWhatsAppUrl } from "@/lib/qr";

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-500">
      {label}
    </span>
  );
}

/**
 * Renders a menu as a clean mobile-first page. Shared by the landing sample
 * preview, the editor's phone mockup, and the public /m/[slug] page.
 */
export default function MenuView({
  menu,
  showBadge,
}: {
  menu: Menu;
  showBadge: boolean;
}) {
  const whatsappUrl = buildWhatsAppUrl(menu.whatsapp, menu.name);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="bg-teal-700 px-5 py-6 text-white">
        <h1 className="text-2xl font-bold">{menu.name || "Your restaurant"}</h1>
        {menu.tagline && <p className="mt-1 text-sm text-teal-100">{menu.tagline}</p>}
      </div>

      {menu.categories.length > 0 && (
        <nav className="sticky top-0 flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2">
          {menu.categories.map((category) => (
            <a
              key={category.id}
              href={`#cat-${category.id}`}
              className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              {category.name || "Category"}
            </a>
          ))}
        </nav>
      )}

      <div className="px-5 py-4">
        {menu.categories.map((category) => (
          <section key={category.id} id={`cat-${category.id}`} className="mb-6 scroll-mt-16">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              {category.name || "Category"}
            </h2>
            <ul className="divide-y divide-slate-100">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-slate-900">{item.name || "New item"}</span>
                      {item.veg && <Tag label="Veg" />}
                      {item.spicy && <Tag label="Spicy" />}
                    </div>
                    {item.description && (
                      <p className="mt-0.5 text-sm text-slate-500">{item.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 font-semibold text-slate-900">
                    {formatPrice(item.price, menu.currency)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="border-t border-slate-200 px-5 py-4">
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full bg-emerald-600 py-3 text-center font-medium text-white hover:bg-emerald-700"
          >
            Order on WhatsApp
          </a>
        ) : (
          <p className="text-center text-sm text-slate-400">
            Add a WhatsApp number to let customers order straight from the menu.
          </p>
        )}
        {showBadge && (
          <p className="mt-3 text-center text-xs text-slate-400">
            Made with MenuFlip — make your own free menu
          </p>
        )}
      </div>
    </div>
  );
}
