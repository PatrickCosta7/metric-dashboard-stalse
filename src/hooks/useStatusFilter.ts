'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { StatusFilterValue } from '@/types';
import { parseStatusFilter } from '@/utils/dashboard';

type UseStatusFilterOptions = {
  // URL Value. Ex: /?status=active
  paramName?: string;
};

export function useStatusFilter(options: UseStatusFilterOptions = {}) {
  const paramName = options.paramName ?? 'status';

  const router = useRouter();
  const searchParams = useSearchParams();

  const urlFilter = useMemo<StatusFilterValue>(() => {
    return parseStatusFilter(searchParams.get(paramName));
  }, [searchParams, paramName]);

  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>(urlFilter);

  // Keep state in sync with URL changes
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