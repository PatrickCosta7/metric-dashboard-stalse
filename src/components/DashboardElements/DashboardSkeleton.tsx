import { Skeleton } from '@/components/Skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-70" />
      </div>

      <Skeleton className="h-100" />
    </div>
  );
}