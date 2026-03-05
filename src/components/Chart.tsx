'use client';

import type { Campaign } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type ChartProps = {
  campaigns: Campaign[];
};

type ChartRow = {
  channel: string;
  investment: number;
};

function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function buildChartData(campaigns: Campaign[]): ChartRow[] {
  const map = new Map<string, number>();

  for (const c of campaigns) {
    map.set(c.channel, (map.get(c.channel) ?? 0) + c.investment);
  }

  return Array.from(map.entries())
    .map(([channel, investment]) => ({ channel, investment }))
    .sort((a, b) => b.investment - a.investment);
}

export function Chart({ campaigns }: ChartProps) {
  const data = buildChartData(campaigns);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Investimento por canal
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Soma do investimento total das campanhas agrupadas por canal.
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCurrencyBRL(Number(v))}
              width={90}
            />
            <Tooltip
              formatter={(value) => formatCurrencyBRL(Number(value))}
              labelStyle={{ color: '#111827' }}
            />
            <Bar dataKey="investment" fill="#111827" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}