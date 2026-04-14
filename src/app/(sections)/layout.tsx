import { Suspense } from 'react';
import { CardGridSkeleton } from '@/components/layout/LoadingState';

export default function SectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-muted rounded mb-6 animate-pulse" />
        <CardGridSkeleton count={6} />
      </div>
    }>
      {children}
    </Suspense>
  );
}
