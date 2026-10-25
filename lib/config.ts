// Central product configuration.

export const SITE_NAME = "MenuFlip";
export const SITE_URL = "https://menuflipapp.vercel.app";

// Paddle checkout (Paddle Billing). The client-side token is safe to expose
// in frontend code per Paddle's docs; it only opens checkouts. Reuses the
// same Paddle account token as PrivatePDF. Price ID is a placeholder — the
// real $9/month Pro price is wired in after it is created in the dashboard.
// While CHECKOUT_READY is false, Pro buttons render "Pro checkout opening
// soon" instead of opening checkout.
export const PADDLE_CLIENT_TOKEN = "live_93531bd281ba80072bd3c787392";
export const PADDLE_PRICE_ID = "pri_01m5rhyhqdma1jqfedekq0a79z";
export const CHECKOUT_READY = true;

// Free-plan limits. Pro (per-device flag, see lib/pro.ts) lifts them.
export const FREE_MAX_MENUS = 1;

// ---------------------------------------------------------------------------
// Display-ad infrastructure (secondary revenue stream).
//
// Ads are OFF by default. To enable later:
//   1. Set ADS_ENABLED = true
//   2. Put your AdSense publisher ID in AD_CLIENT
//   3. Paste your AdSense <ins> snippet into components/AdSlot.tsx
//
// The AdSlot component renders NOTHING while disabled — no empty boxes,
// no reserved space, no layout shift.
// ---------------------------------------------------------------------------
export const ADS_ENABLED = false;
export const AD_CLIENT = "";
