import Link from "next/link";
import MenuView from "@/components/MenuView";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import { createSampleMenu } from "@/lib/menu";

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
        {n}
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export default function Home() {
  const sample = createSampleMenu();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Your menu, on every table — as a QR code
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
          Type your menu once. Get a beautiful mobile menu page and a printable
          QR code. No PDF, no designer, no app for your customers to install.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/create"
            className="rounded-full bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
          >
            Make my menu — free
          </Link>
          <a
            href="#sample"
            className="rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-white"
          >
            See a sample menu
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Ready in about 5 minutes. Free plan, no sign-up.
        </p>
      </section>

      <AdSlot label="below-hero" />

      {/* Sample preview */}
      <section id="sample" className="mx-auto max-w-5xl scroll-mt-8 px-4 pb-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">
          This is what your customers see
        </h2>
        <p className="mt-2 text-center text-slate-600">
          A real sample menu — clean on any phone, prices clear, one tap to order.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <MenuView menu={sample} showBadge={true} />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">How it works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Step
            n="1"
            title="Type your menu"
            text="Add categories and items with prices. Tag dishes veg or spicy. Watch the phone preview update as you type."
          />
          <Step
            n="2"
            title="Publish and share"
            text="One click gives you a menu page link. Send it on WhatsApp, put it in your bio, or print it."
          />
          <Step
            n="3"
            title="Print the QR code"
            text="Download a print-ready QR card, stick it on tables, and customers scan to see your menu instantly."
          />
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl bg-teal-700 px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold">Free to start. Pro when you grow.</h2>
          <p className="mx-auto mt-2 max-w-lg text-teal-100">
            One menu free, forever. Pro is $9/month for unlimited menus, no
            MenuFlip badge, and custom QR colors.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-medium text-teal-800 hover:bg-teal-50"
          >
            See pricing
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">Questions</h2>
        <div className="mt-8">
          <Faq
            items={[
              {
                q: "Do my customers need an app?",
                a: "No. They scan the QR code and the menu opens in their browser — nothing to install, no account needed.",
              },
              {
                q: "What if I change a price later?",
                a: "Edit your menu any time. The page and QR code stay the same, so your printed codes never go out of date.",
              },
              {
                q: "Where is my menu stored?",
                a: "In your own browser, on this device. There is no account and no server copy in this version — so a menu saved here opens here. If you switch devices, recreate it or wait for cloud menus, which are on the roadmap.",
              },
              {
                q: "Can customers order from the menu?",
                a: "Yes, on Pro: the WhatsApp order button lets a customer message you straight from the menu page.",
              },
              {
                q: "Is the free plan really free?",
                a: "Yes — one menu, free forever. It carries a small 'Made with MenuFlip' line at the bottom. Pro removes it.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
