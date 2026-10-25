import { Suspense } from "react";
import MenuClient from "@/components/MenuClient";

export default function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-20 text-center text-slate-500">
          Loading menu…
        </div>
      }
    >
      <MenuClient params={params} />
    </Suspense>
  );
}
