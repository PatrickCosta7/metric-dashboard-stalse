'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

type DashboardHeaderProps = {
  title: string;
  simulateError: boolean;
  onToggleSimulateError: () => void;
};

export function DashboardHeader({
  title,
  simulateError,
  onToggleSimulateError,
}: DashboardHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight bg-linear-to-r from-indigo-800 dark:from-indigo-400 to-violet-500 dark:to-violet-200 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <div className="flex w-full flex-row items-center gap-2 sm:w-auto sm:gap-3">
        <div className="shrink-0">
          <ThemeToggle />
        </div>

        <div className="flex-1 sm:shrink-0">
          <button
              type="button"
              onClick={onToggleSimulateError}
              className={[
                'flex-1 h-10 min-w-0 rounded-lg border px-3 py-2 text-sm font-medium transition',
                'active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70',
                'sm:w-auto',
                'sm:flex-none',
                'sm:ml-1',
                simulateError
                  ? 'border-red-200 bg-red-50 text-red-900 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200 dark:hover:bg-red-950/50'
                  : 'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900',
              ].join(' ')}
          >
            {simulateError ? 'Desativar erro' : 'Simular erro'}
          </button>
        </div>
      </div>
    </header>
  );
}