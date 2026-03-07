'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { LaptopMinimal, Sun, Moon } from 'lucide-react';

type ThemeOption = 'system' | 'light' | 'dark';

const options: Array<{
  value: ThemeOption;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: 'system', label: 'Sistema', Icon: LaptopMinimal },
  { value: 'light', label: 'Claro', Icon: Sun },
  { value: 'dark', label: 'Escuro', Icon: Moon },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950"
      role="group"
      aria-label="Tema"
    >
      {options.map(({ value, label, Icon }) => {
        const selected = (theme as ThemeOption) === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={[
              'inline-flex h-8 w-8 items-center justify-center rounded-lg transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70',
              'active:scale-[0.98]',
              selected
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900',
            ].join(' ')}
            aria-label={label}
            title={label}
            aria-pressed={selected}
          >
            <Icon className="h-6 w-6" />
          </button>
        );
      })}
    </div>
  );
}