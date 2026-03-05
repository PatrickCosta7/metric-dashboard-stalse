'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { StatusFilterValue } from '@/types';
import { parseStatusFilter } from '@/utils/dashboard';

type UseStatusFilterOptions = {
  /**
   * Nome do parâmetro na URL.
   * Ex.: /?status=active
   */
  paramName?: string;
};

export function useStatusFilter(options: UseStatusFilterOptions = {}) {
  const paramName = options.paramName ?? 'status';

  const router = useRouter();
  const searchParams = useSearchParams();

  // URL -> filtro (memoizado pra não recalcular sem necessidade)
  const urlFilter = useMemo<StatusFilterValue>(() => {
    return parseStatusFilter(searchParams.get(paramName));
  }, [searchParams, paramName]);

  // Estado local inicial vem da URL
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>(urlFilter);

  // Mantém estado local sincronizado quando a URL mudar
  // (back/forward, link compartilhado, etc.)
  useEffect(() => {
    setStatusFilter(urlFilter);
  }, [urlFilter]);

  const setStatusFilterAndSyncUrl = useCallback(
    (next: StatusFilterValue) => {
      setStatusFilter(next);

      const params = new URLSearchParams(searchParams.toString());

      if (next === 'all') params.delete(paramName);
      else params.set(paramName, next);

      const query = params.toString();
      router.replace(query ? `/?${query}` : '/', { scroll: false });
    },
    [router, searchParams, paramName]
  );

  return {
    statusFilter,
    setStatusFilter: setStatusFilterAndSyncUrl,
  };
}