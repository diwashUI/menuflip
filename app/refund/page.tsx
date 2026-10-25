export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900">Refund Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>
      <div className="mt-6 space-y-5 leading-relaxed text-slate-700">
        <p>
          MenuFlip Pro is a $9/month subscription billed through Paddle. If
          something is not working as described, tell us first — most problems
          are fixable.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Refunds</h2>
        <p>
          If you were charged in error, or Pro never activated on your device
          after a successful payment, write to{" "}
          <a href="mailto:itsaurevya@gmail.com" className="font-medium text-teal-700 underline">
            itsaurevya@gmail.com
          </a>{" "}
          within 14 days of the charge with your Paddle receipt. We will refund
          the most recent month&apos;s payment.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Cancellation</h2>
        <p>
          You can cancel anytime through Paddle (the link is in your receipt
          email). Cancellation stops future charges; your current month stays
          active until its end, and your published menus stay readable afterwards
          under the free limits.
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Free plan</h2>
        <p>
          The free plan costs nothing, so there is nothing to refund.
        </p>
      </div>
    </div>
  );
}
