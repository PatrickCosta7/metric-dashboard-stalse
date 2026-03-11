import HomeClient from '@/components/HomeClient';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="relative mx-auto max-w-6xl p-4 sm:p-6">
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 -z-10',
          // indigo gradient over background
          'bg-[radial-gradient(60%_50%_at_50%_0%,rgba(79,70,229,0.20)_0%,rgba(79,70,229,0.00)_60%)]',
          'dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.18)_0%,rgba(99,102,241,0.00)_60%)]',
        ].join(' ')}
      />

      <section
        className="
          rounded-2xl border bg-white/80 shadow-sm backdrop-blur
          border-zinc-200
          dark:border-zinc-800 dark:bg-zinc-950/60
          p-4 sm:p-6
          "
      >
        <Suspense
          fallback={
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              Carregando…
            </div>
          }
        >
          <HomeClient />
        </Suspense>
      </section>
    </main>
  );
}