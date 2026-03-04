import type { Campaign } from '@/types/dashboard';
import type { StatusFilterValue } from '../types/filters';

export function applyStatusFilter(
  campaigns: Campaign[],
  filter: StatusFilterValue
) {
  if (filter === 'all') return campaigns;
  if (filter === 'active') return campaigns.filter((c) => c.status === 'Ativa');
  return campaigns.filter((c) => c.status === 'Pausada');
}

export function parseStatusFilter(raw: string | null): StatusFilterValue {
  if (raw === 'active' || raw === 'paused' || raw === 'all') return raw;
  return 'all';
}