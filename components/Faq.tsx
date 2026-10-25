export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
          <summary className="cursor-pointer font-medium text-slate-900">{item.q}</summary>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
