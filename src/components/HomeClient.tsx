'use client';

import { useMemo, useState } from 'react';

import type { StatusFilterValue } from '@/types';

import { useStatusFilter } from '@/hooks/useStatusFilter';
import { useDashboardData } from '@/hooks/useDashboardData';
import { applyStatusFilter } from '@/utils/dashboard';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardSuccess } from '@/components/DashboardSuccess';
import { DashboardError } from '@/components/DashboardError';
import { DashboardLoading } from '@/components/DashboardLoading';

export default function HomeClient() {
  const [simulateError, setSimulateError] = useState(false);
  const state = useDashboardData(simulateError);

  const { statusFilter, setStatusFilter } = useStatusFilter();

  const campaignsFiltered = useMemo(() => {
    if (state.status !== 'success') return [];
    return applyStatusFilter(state.data.campaigns, statusFilter);
  }, [state, statusFilter]);

  function handleChangeFilter(next: StatusFilterValue) {
    setStatusFilter(next);
  }

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">

      <DashboardHeader
        title="Dashboard de Métricas"
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