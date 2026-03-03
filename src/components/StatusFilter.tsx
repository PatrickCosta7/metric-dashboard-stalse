type StatusFilterValue = 'all' | 'active' | 'paused';

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
    <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
      {options.map((opt) => {
        const selected = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'rounded-md px-3 py-1.5 text-sm font-medium transition',
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

export type { StatusFilterValue };