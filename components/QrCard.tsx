"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

const DEFAULT_DARK = "#0f172a";

/**
 * Generates the QR code client-side (nothing leaves the browser) and offers
 * it as a downloadable PNG. The surrounding card is print-friendly: the
 * global print stylesheet hides everything except #qr-print-card.
 */
export default function QrCard({
  url,
  restaurantName,
  canCustomize,
}: {
  url: string;
  restaurantName: string;
  canCustomize: boolean;
}) {
  const [dark, setDark] = useState(DEFAULT_DARK);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: { dark, light: "#ffffff" },
    })
      .then((png) => {
        if (!cancelled) setDataUrl(png);
      })
      .catch(() => {
        if (!cancelled) setDataUrl("");
      });
    return () => {
      cancelled = true;
    };
  }, [url, dark]);

  return (
    <div id="qr-print-card" className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
      <h2 className="text-lg font-semibold text-slate-900">{restaurantName}</h2>
      <p className="mt-1 text-sm text-slate-500">Scan to view the menu</p>
      <div className="mx-auto mt-4 h-56 w-56">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`QR code linking to ${url}`} className="h-full w-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-400">
            Generating QR code…
          </div>
        )}
      </div>
      <p className="mt-2 break-all text-xs text-slate-400">{url}</p>

      <div className="mt-5 flex flex-wrap justify-center gap-3 print:hidden">
        <a
          href={dataUrl || undefined}
          download={`${restaurantName || "menu"}-qr.png`}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            dataUrl
              ? "bg-teal-600 text-white hover:bg-teal-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          Download PNG
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Print this card
        </button>
      </div>

      <div className="mt-4 print:hidden">
        <label className="text-sm text-slate-600">
          QR color{" "}
          <input
            type="color"
            value={dark}
            disabled={!canCustomize}
            onChange={(e) => setDark(e.target.value)}
            className="ml-1 h-8 w-10 cursor-pointer align-middle disabled:cursor-not-allowed disabled:opacity-40"
          />
        </label>
        {!canCustomize && (
          <p className="mt-1 text-xs text-slate-400">
            Custom QR colors are a Pro feature.
          </p>
        )}
      </div>
    </div>
  );
}
