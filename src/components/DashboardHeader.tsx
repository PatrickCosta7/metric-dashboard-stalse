'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
  simulateError: boolean;
  onToggleSimulateError: () => void;
};

export function DashboardHeader({
  title,
  subtitle,
  simulateError,
  onToggleSimulateError,
}: DashboardHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <ThemeToggle />

        <button
          type="button"
          onClick={onToggleSimulateError}
          className={[
            'w-full rounded-md border px-3 py-2 text-sm font-medium transition',
            'active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600',
            'sm:w-auto',
            simulateError
              ? 'border-red-200 bg-red-50 text-red-900 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200 dark:hover:bg-red-950/50'
              : 'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900',
          ].join(' ')}
        >
          {simulateError ? 'Desativar erro' : 'Simular erro'}
        </button>
      </div>
    </header>
  );
}