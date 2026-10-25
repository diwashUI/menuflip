import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built by{" "}
          <a href="https://sahayakos.vercel.app" target="_blank" rel="noreferrer" className="font-medium text-slate-700 underline">
            SahayakOS
          </a>
        </p>
        <nav className="flex gap-5">
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link href="/terms" className="hover:text-slate-900">Terms</Link>
          <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
          <Link href="/refund" className="hover:text-slate-900">Refunds</Link>
        </nav>
      </div>
    </footer>
  );
}
