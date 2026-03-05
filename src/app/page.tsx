'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { StatusFilterValue } from '@/types';
import { useDashboardData } from '@/hooks/useDashboardData';
import { parseStatusFilter, applyStatusFilter } from '@/utils/dashboard';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardSuccess } from '@/components/DashboardSucess';
import { DashboardError } from '@/components/DashboardError';
import { DashboardLoading } from '@/components/DashboardLoading';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [simulateError, setSimulateError] = useState(false);
  const state = useDashboardData(simulateError);

  // URL -> filtro
  const urlFilter = parseStatusFilter(searchParams.get('status'));

  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>(urlFilter);

  useEffect(() => {
    setStatusFilter(urlFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlFilter]);

  const campaignsFiltered = useMemo(() => {
    if (state.status !== 'success') return [];
    return applyStatusFilter(state.data.campaigns, statusFilter);
  }, [state, statusFilter]);

  function handleChangeFilter(next: StatusFilterValue) {
    setStatusFilter(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next === 'all') params.delete('status');
    else params.set('status', next);

    const query = params.toString();
    router.replace(query ? `/?${query}` : '/', { scroll: false });
  }

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">

      <DashboardHeader
        title="Dashboard de Métricas"
        subtitle="Visão geral de campanhas e métricas principais."
        simulateError={simulateError}
        onToggleSimulateError={() => setSimulateError((v) => !v)}
      />

      {state.status === 'loading' && <DashboardLoading />}

      {state.status === 'error' && <DashboardError message={state.message} />}

      {state.status === 'success' && (
        <DashboardSuccess
          data={state.data}
          statusFilter={statusFilter}
          onChangeStatusFilter={handleChangeFilter}
          campaignsFiltered={campaignsFiltered}
        />
      )}
    </main>
  );
}