'use client';

import { useEffect, useState } from 'react';
import type { DashboardResponse } from '@/types/dashboard';
import { Alert } from '@/components/Alert';
import { Skeleton } from '@/components/Skeleton';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: DashboardResponse };

export default function Home() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [simulateError, setSimulateError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setState({ status: 'loading' });

        await new Promise((r) => setTimeout(r, 600));

        const endpoint = simulateError ? '/api/data?error=1' : '/api/data';
        const res = await fetch(endpoint, { cache: 'no-store' });

        if (!res.ok) {
          throw new Error(`Falha ao buscar dados (HTTP ${res.status})`);
        }

        const data = (await res.json()) as DashboardResponse;

        if (!cancelled) {
          setState({ status: 'success', data });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido';
        if (!cancelled) {
          setState({ status: 'error', message });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [simulateError]);

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dashboard de Métricas
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            MVP: carregamento, erro e consumo de API simulada.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSimulateError((v) => !v)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
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

          <Skeleton className="h-64" />

          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
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
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Dados carregados
          </h2>

          <pre className="mt-4 overflow-auto rounded-md bg-zinc-50 p-3 text-xs text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
            {JSON.stringify(state.data, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}