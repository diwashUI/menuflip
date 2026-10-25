"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import {
  CHECKOUT_READY,
  PADDLE_CLIENT_TOKEN,
  PADDLE_PRICE_ID,
  SITE_URL,
} from "@/lib/config";

/**
 * Opens the Paddle overlay checkout for the $9/month Pro plan.
 * While CHECKOUT_READY is false (real price not wired yet), renders a
 * disabled "Pro checkout opening soon" button — never a dead checkout.
 * On successful payment Paddle redirects to /pro/success, which stamps the
 * Pro flag on this device.
 */
export default function ProCheckoutButton({ className = "" }: { className?: string }) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  useEffect(() => {
    if (!CHECKOUT_READY || !PADDLE_CLIENT_TOKEN) return;
    initializePaddle({ environment: "production", token: PADDLE_CLIENT_TOKEN }).then(
      (instance) => {
        if (instance) setPaddle(instance);
      },
    );
  }, []);

  if (!CHECKOUT_READY) {
    return (
      <button type="button" disabled className={`${className} cursor-not-allowed opacity-60`}>
        Pro checkout opening soon
      </button>
    );
  }

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
      settings: {
        theme: "light",
        successUrl: `${SITE_URL}/pro/success`,
      },
    });
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={!paddle}
      className={`${className} disabled:cursor-wait disabled:opacity-70`}
    >
      Go Pro — $9/month
    </button>
  );
}
