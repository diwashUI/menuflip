import ProCheckoutButton from "@/components/ProCheckoutButton";
import Faq from "@/components/Faq";

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm text-slate-700">
      <span className="font-bold text-teal-600">✓</span>
      {children}
    </li>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-center text-3xl font-bold text-slate-900">Pricing</h1>
      <p className="mt-2 text-center text-slate-600">
        Start free. Upgrade when you have more than one menu to run.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">Free</h2>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            $0 <span className="text-base font-normal text-slate-500">forever</span>
          </p>
          <ul className="mt-5 space-y-2">
            <Check>1 menu</Check>
            <Check>Beautiful mobile menu page</Check>
            <Check>Printable QR code (standard color)</Check>
            <Check>WhatsApp order button</Check>
            <Check>Share link for WhatsApp and bios</Check>
          </ul>
          <p className="mt-5 text-sm text-slate-500">
            Free menus carry a small “Made with MenuFlip” line at the bottom.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-teal-600 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">Pro</h2>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            $9 <span className="text-base font-normal text-slate-500">/month</span>
          </p>
          <ul className="mt-5 space-y-2">
            <Check>Unlimited menus</Check>
            <Check>No MenuFlip badge on your menus</Check>
            <Check>Custom QR colors to match your brand</Check>
            <Check>Everything in Free</Check>
          </ul>
          <div className="mt-6">
            <ProCheckoutButton className="w-full rounded-full bg-teal-600 py-3 font-medium text-white hover:bg-teal-700" />
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">
            Paid once a month through Paddle. Cancel anytime — your menus stay
            readable, you just drop back to the free limits.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-slate-900">Questions</h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                q: "What happens to my menus if I cancel Pro?",
                a: "Nothing breaks. Your published menus stay readable and their QR codes keep working. You just can't create new menus beyond the free limit of one until you upgrade again.",
              },
              {
                q: "Do I need an account?",
                a: "No. Menus are saved in your browser and Pro is stamped on this device after checkout. There is no login in this version.",
              },
              {
                q: "Can I change my menu after printing the QR code?",
                a: "Yes. Edit anytime — the page and QR code stay the same, so printed codes never go out of date.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
