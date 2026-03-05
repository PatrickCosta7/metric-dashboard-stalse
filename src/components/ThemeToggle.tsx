'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type ThemeOption = 'system' | 'light' | 'dark';

const options: Array<{ value: ThemeOption; label: string }> = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Evita “hydration mismatch” do toggle (theme só é confiável após mount)
  if (!mounted) return null;

  return (
    <div
      className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950"
      role="group"
      aria-label="Tema"
    >
      {options.map((opt) => {
        const selected = (theme as ThemeOption) === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={[
              'rounded-md px-3 py-1.5 text-sm font-medium transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600',
              'active:scale-[0.98]',
              selected
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900',
            ].join(' ')}
            aria-pressed={selected}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}