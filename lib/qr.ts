// QR link builder — pure function, tested in qr.test.ts.
//
// The QR code always points at the page the visitor is actually on:
// the editor builds the link from window.location.origin, so the QR stays
// correct no matter which domain serves the app.

/** Builds the public menu URL. Throws on an empty slug. */
export function buildMenuUrl(origin: string, slug: string): string {
  if (!slug.trim()) throw new Error("slug is required to build a menu URL");
  const cleanOrigin = origin.replace(/\/+$/, "");
  return `${cleanOrigin}/m/${encodeURIComponent(slug.trim())}`;
}

/** Builds the WhatsApp order link for a menu, or null when no number set. */
export function buildWhatsAppUrl(whatsapp: string, menuName: string): string | null {
  const digits = whatsapp.replace(/[^0-9]/g, "");
  if (digits.length < 7) return null;
  const text = encodeURIComponent(`Hi ${menuName}! I'd like to order from your menu.`);
  return `https://wa.me/${digits}?text=${text}`;
}
