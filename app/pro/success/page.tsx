"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { setPro } from "@/lib/pro";

/** Paddle redirects here after a successful Pro checkout. Stamps the
 *  per-device Pro flag so the free limits lift in this browser. */
export default function ProSuccessPage() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPro();
    setDone(true);
  }, []);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Welcome to Pro!</h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        {done
          ? "Pro is now active on this device: unlimited menus, no MenuFlip badge, and custom QR colors."
          : "Activating Pro on this device…"}
      </p>
      <p className="mt-3 text-sm text-slate-500">
        Keep your Paddle receipt email — it is your proof of purchase. Pro is
        tied to this browser; if you switch devices, use the same checkout to
        activate there.
      </p>
      <Link
        href="/create"
        className="mt-8 inline-block rounded-full bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
      >
        Go make menus
      </Link>
    </div>
  );
}
