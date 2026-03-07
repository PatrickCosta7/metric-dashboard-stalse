import { Alert } from '@/components/Alert';

type DashboardErrorProps = {
  message: string;
};

export function DashboardError({ message }: DashboardErrorProps) {
  return (
    <Alert title="Erro: Não foi possível carregar o dashboard" description={message} />
  );
}