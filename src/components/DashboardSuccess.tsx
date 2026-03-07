import type { DashboardResponse, StatusFilterValue } from '@/types';

import { MetricCard } from '@/components/MetricCard';
import { Chart } from '@/components/Chart';
import { StatusFilter } from '@/components/StatusFilter';
import { Table } from '@/components/Table';

type DashboardSuccessProps = {
  data: DashboardResponse;
  statusFilter: StatusFilterValue;
  onChangeStatusFilter: (next: StatusFilterValue) => void;
  campaignsFiltered: DashboardResponse['campaigns'];
};

export function DashboardSuccess({
  data,
  statusFilter,
  onChangeStatusFilter,
  campaignsFiltered,
}: DashboardSuccessProps) {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.metrics.map((m: (typeof data.metrics)[number]) => (
          <MetricCard key={m.id} metric={m} />
        ))}
      </section>

      {/* Card único: header + filtros + tabela */}
      <section
        className={[
          'rounded-2xl border bg-white/70 shadow-sm backdrop-blur',
          'border-zinc-200',
          'dark:border-zinc-800 dark:bg-zinc-950/40',
        ].join(' ')}
      >
        <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Campanhas
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Filtre por status e compartilhe o link com o filtro aplicado.
            </p>
          </div>

          <StatusFilter value={statusFilter} onChange={onChangeStatusFilter} />
        </div>

        <div className="p-2 sm:p-3">
          <Table campaigns={campaignsFiltered} />
        </div>
      </section>

      <section>
        <Chart campaigns={data.campaigns} />
      </section>
    </div>
  );
}