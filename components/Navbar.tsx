import Link from "next/link";

function QrIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 14h3v3h-3zM20 14h1M17 17h4M20 20h-3" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
            <QrIcon />
          </span>
          MenuFlip
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          <Link href="/create" className="hover:text-slate-900">Create a menu</Link>
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link
            href="/create"
            className="rounded-full bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700"
          >
            Make my menu
          </Link>
        </nav>
      </div>
    </header>
  );
}
