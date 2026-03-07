import type { Metric } from '@/types';
import { TrendingUp, Users, BadgeDollarSign, Gauge } from 'lucide-react';

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

function pickMetricIcon(metric: Metric) {
  const label = metric.label.toLowerCase();

  if (label.includes('cliente')) return Users;
  if (label.includes('receita') || metric.format === 'currency') return BadgeDollarSign;
  if (label.includes('convers')) return TrendingUp;

  return Gauge;
}

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = pickMetricIcon(metric);

  return (
    <div
      className={[
        'group rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur',
        'dark:border-zinc-800 dark:bg-zinc-950/60',
        'border-t-4 border-t-indigo-500/80 dark:border-t-indigo-400/70',
        'transition will-change-transform',
        'hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white',
        'dark:hover:border-zinc-700 dark:hover:bg-zinc-950/80',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {metric.label}
          </div>

          <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {formatMetricValue(metric)}
          </div>
        </div>

        <div
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            'bg-indigo-50 text-indigo-700',
            'dark:bg-indigo-950/40 dark:text-indigo-300',
            'ring-1 ring-inset ring-indigo-100 dark:ring-indigo-900/50',
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}