import type { DashboardResponse } from '@/types';
import type { StatusFilterValue } from '@/types';

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
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.metrics.map((m: typeof data.metrics[number]) => (
          <MetricCard key={m.id} metric={m} />
        ))}
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Campanhas</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Filtre por status e compartilhe o link com o filtro aplicado.
          </p>
        </div>

        <StatusFilter value={statusFilter} onChange={onChangeStatusFilter} />
      </section>

      <section>
        <Table campaigns={campaignsFiltered} />
      </section>

      <section>
        <Chart campaigns={data.campaigns} />
      </section>
    </div>
  );
}