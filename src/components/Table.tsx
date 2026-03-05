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
        isActive
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
      ].join(' ')}
    >
      {status}
    </span>
  );
}

export function Table({ campaigns }: TableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Nome</th>
              <th className="px-4 py-3 text-left font-medium">Canal</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Investimento</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {campaigns.map((c) => (
              <tr key={c.id} className="text-zinc-900 dark:text-zinc-50">
                <td className="px-4 py-3 whitespace-nowrap">{c.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{c.channel}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
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
    </div>
  );
}