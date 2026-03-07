import type { Campaign } from '@/types';

type TableProps = {
  campaigns: Campaign[];
};

function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({ status }: { status: Campaign['status'] }) {
  const isActive = status === 'Ativa';

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        'ring-1 ring-inset',
        isActive
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/50'
          : 'bg-zinc-100 text-zinc-700 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800',
      ].join(' ')}
    >
      {status}
    </span>
  );
}

export function Table({ campaigns }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
              Canal
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide">
              Investimento
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {campaigns.map((c, idx) => (
            <tr
              key={c.id}
              className={[
                'text-zinc-900 transition-colors dark:text-zinc-50',
                idx % 2 === 0
                  ? 'bg-white dark:bg-transparent'
                  : 'bg-zinc-50/40 dark:bg-zinc-950/20',
                'hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20',
              ].join(' ')}
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium">
                {c.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-zinc-700 dark:text-zinc-200">
                {c.channel}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={c.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                {formatCurrencyBRL(c.investment)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {campaigns.length === 0 && (
        <div className="p-4 text-sm text-zinc-600 dark:text-zinc-300">
          Nenhuma campanha encontrada.
        </div>
      )}
    </div>
  );
}