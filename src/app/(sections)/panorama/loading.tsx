import { ChartSkeleton } from '@/components/layout/LoadingState';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="h-8 w-56 bg-muted rounded animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
      <ChartSkeleton />
    </div>
  );
}
