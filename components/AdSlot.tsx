import { ADS_ENABLED } from "@/lib/config";

/** Renders nothing while ads are disabled — no empty boxes, no layout shift. */
export default function AdSlot({ label }: { label: string }) {
  if (!ADS_ENABLED) return null;
  return (
    <div
      data-ad-slot={label}
      className="mx-auto my-8 flex min-h-[90px] max-w-3xl items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-400"
    >
      Ad space
    </div>
  );
}
