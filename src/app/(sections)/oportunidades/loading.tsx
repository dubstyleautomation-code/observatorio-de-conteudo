import { CardGridSkeleton } from '@/components/layout/LoadingState';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="h-8 w-56 bg-muted rounded animate-pulse" />
      <div className="h-24 w-full bg-muted rounded-lg animate-pulse" />
      <div className="flex gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-muted rounded animate-pulse" />
        ))}
      </div>
      <CardGridSkeleton count={6} />
    </div>
  );
}
