export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <p>
          MenuFlip is designed to collect as little as possible. In short: your
          menus never leave your browser.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">What we do not collect</h2>
        <p>
          Menus you create are stored in your browser&apos;s local storage only.
          We do not run accounts, we do not upload your menu content to our
          servers, and we cannot see your menus.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Payments</h2>
        <p>
          Pro payments are processed by Paddle (our merchant of record). Paddle
          handles your card details; MenuFlip never sees them. Paddle may share
          basic purchase information with us (plan, amount, date) so we can
          support your purchase.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Analytics and ads</h2>
        <p>
          This site does not run advertising and does not use cross-site
          tracking. If that changes, this page will be updated first.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p>
          Privacy questions? Write to{" "}
          <a href="mailto:itsaurevya@gmail.com" className="font-medium text-teal-700 underline">
            itsaurevya@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
