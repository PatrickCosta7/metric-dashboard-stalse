export type CampaignStatus = 'Ativa' | 'Pausada';

export type Metric = {
  id: 'totalClients' | 'monthlyRevenue' | 'conversionRate';
  label: string;
  value: number;
  format: 'number' | 'currency' | 'percent';
};

export type Campaign = {
  id: string;
  name: string;
  channel: string;
  status: CampaignStatus;
  investment: number;
};

export type DashboardResponse = {
  metrics: Metric[];
  campaigns: Campaign[];
};