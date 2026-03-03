'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { Campaign, DashboardResponse } from '@/types/dashboard';
import { Alert } from '@/components/Alert';
import { Skeleton } from '@/components/Skeleton';
import { MetricCard } from '@/components/MetricCard';
import { Table } from '@/components/Table';
import { StatusFilter, type StatusFilterValue } from '@/components/StatusFilter';
import { Chart } from '@/components/Chart';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: DashboardResponse };

function parseStatusFilter(raw: string | null): StatusFilterValue {
  if (raw === 'active' || raw === 'paused' || raw === 'all') return raw;
  return 'all';
}

function applyStatusFilter(campaigns: Campaign[], filter: StatusFilterValue) {
  if (filter === 'all') return campaigns;
  if (filter === 'active') return campaigns.filter((c) => c.status === 'Ativa');
  return campaigns.filter((c) => c.status === 'Pausada');
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlFilter = parseStatusFilter(searchParams.get('status'));

  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [simulateError, setSimulateError] = useState(false);

  // Fonte de verdade no estado local, inicializado pela URL
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>(urlFilter);

  // Se o usuário editar a URL manualmente / compartilhar link, manter UI em sync.
  useEffect(() => {
    setStatusFilter(urlFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlFilter]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setState({ status: 'loading' });

        await new Promise((r) => setTimeout(r, 600));

        const endpoint = simulateError ? '/api/data?error=1' : '/api/data';
        const res = await fetch(endpoint, { cache: 'no-store' });

        if (!res.ok) throw new Error(`Falha ao buscar dados (HTTP ${res.status})`);

        const data = (await res.json()) as DashboardResponse;

        if (!cancelled) setState({ status: 'success', data });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido';
        if (!cancelled) setState({ status: 'error', message });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [simulateError]);

  const campaignsFiltered = useMemo(() => {
    if (state.status !== 'success') return [];
    return applyStatusFilter(state.data.campaigns, statusFilter);
  }, [state, statusFilter]);

  function handleChangeFilter(next: StatusFilterValue) {
    setStatusFilter(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next === 'all') params.delete('status');
    else params.set('status', next);

    // replace evita poluir histórico; scroll false mantém posição
    const query = params.toString();
    router.replace(query ? `/?${query}` : '/', { scroll: false });
  }

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dashboard de Métricas
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Visão geral de campanhas e métricas principais.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSimulateError((v) => !v)}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900 sm:w-auto"
        >
          {simulateError ? 'Desativar erro' : 'Simular erro'}
        </button>
      </header>

      {state.status === 'loading' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-120" />
          </div>

          <div>
            <Skeleton className="h-75" />
          </div>        

        </div>
      )}

      {state.status === 'error' && (
        <Alert
          title="Não foi possível carregar o dashboard"
          description={state.message}
        />
      )}

      {state.status === 'success' && (
        <div className="space-y-6">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {state.data.metrics.map((m) => (
              <MetricCard key={m.id} metric={m} />
            ))}
          </section>

          <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Campanhas
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Filtre por status e compartilhe o link com o filtro aplicado.
              </p>
            </div>

            <StatusFilter value={statusFilter} onChange={handleChangeFilter} />
          </section>

          <section>
            <Table campaigns={campaignsFiltered} />
          </section>

          <section>
            <Chart campaigns={state.data.campaigns} />
          </section>

        </div>
      )}
    </main>
  );
}