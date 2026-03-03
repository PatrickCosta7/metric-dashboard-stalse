import type { Metric } from '@/types/dashboard';

function formatMetricValue(metric: Metric) {
  switch (metric.format) {
    case 'currency':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
      }).format(metric.value);
    case 'percent':
      return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        maximumFractionDigits: 1,
      }).format(metric.value);
    default:
      return new Intl.NumberFormat('pt-BR').format(metric.value);
  }
}

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-sm text-zinc-600 dark:text-zinc-300">
        {metric.label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {formatMetricValue(metric)}
      </div>
    </div>
  );
}