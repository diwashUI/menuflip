export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <p>
          MenuFlip is a tool for creating mobile menu pages and QR codes, built by
          SahayakOS. By using MenuFlip you agree to these terms.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">What MenuFlip does</h2>
        <p>
          You type a menu; MenuFlip renders it as a mobile-friendly page and
          generates a QR code linking to it. In this version menus are stored in
          your own browser (localStorage) — there is no account and no server
          copy. A menu saved on one device does not automatically appear on
          another.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Your content</h2>
        <p>
          Your menu content is yours. You are responsible for it being accurate —
          prices, items, and descriptions are exactly what you typed. Do not
          publish content you do not have the right to use.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Pro plan</h2>
        <p>
          Pro costs $9 per month and is billed through Paddle, our payment
          processor. Pro lifts the free-plan limits (one menu) to unlimited menus,
          removes the “Made with MenuFlip” badge, and unlocks custom QR colors.
          Pro is activated on the device used at checkout. Cancel anytime through
          Paddle; your published menus stay readable and drop back to the free
          limits.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
        <p>
          MenuFlip is provided “as is”. We aim for reliable service but do not
          guarantee uninterrupted availability, and we are not liable for lost
          menus if a browser clears its storage.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p>
          Questions? Write to{" "}
          <a href="mailto:itsaurevya@gmail.com" className="font-medium text-teal-700 underline">
            itsaurevya@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
