'use client';

import { useEffect, useState } from 'react';
import type { DashboardResponse } from '@/types';

type DashboardLoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: DashboardResponse };

export function useDashboardData(simulateError: boolean) {
  const [state, setState] = useState<DashboardLoadState>({ status: 'loading' });

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

  return state;
}

export type { DashboardLoadState };