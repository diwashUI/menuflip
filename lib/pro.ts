// Pro license state — 100% client-side, mirroring the PrivatePDF pattern.
//
// After a successful Paddle checkout the buyer lands on /pro/success, which
// stamps this flag, and the free-plan limits stop applying on this
// device/browser. No accounts, no backend.

export const PRO_STORAGE_KEY = "menuflip_pro";

export function isPro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setPro(): void {
  try {
    window.localStorage.setItem(PRO_STORAGE_KEY, "1");
  } catch {
    // Storage unavailable (e.g. private mode). Checkout still succeeded —
    // the Paddle receipt email is the proof of purchase.
  }
}
