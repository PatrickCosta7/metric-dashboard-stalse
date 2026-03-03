type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={[
        'animate-pulse rounded-md bg-zinc-200/70 dark:bg-zinc-800/60',
        className,
      ].join(' ')}
    />
  );
}