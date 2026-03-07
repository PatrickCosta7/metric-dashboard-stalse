import type { StatusFilterValue } from '@/types';

type StatusFilterProps = {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
};

const options: Array<{ value: StatusFilterValue; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Ativas' },
  { value: 'paused', label: 'Pausadas' },
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div
      className={[
        'inline-flex items-center rounded-xl border p-1',
        'border-zinc-200 bg-white',
        'dark:border-zinc-800 dark:bg-zinc-950',
      ].join(' ')}
      role="group"
      aria-label="Filtro de status"
    >
      {options.map((opt) => {
        const selected = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'rounded-lg px-3 py-2 text-sm font-medium transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70',
              'active:scale-[0.98]',
              selected
                ? 'bg-indigo-600 text-white shadow-sm'
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