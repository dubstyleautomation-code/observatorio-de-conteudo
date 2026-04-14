import dynamic from 'next/dynamic';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/sections/Cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartSkeleton } from '@/components/layout/LoadingState';
import { getPanoramaStats } from '@/lib/data';
import { BarChart2, TrendingUp, Globe, DollarSign } from 'lucide-react';

const PanoramaChart = dynamic(
  () => import('@/components/charts/PanoramaChart').then(m => ({ default: m.PanoramaChart })),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const ChoroplethMap = dynamic(
  () => import('@/components/charts/ChoroplethMap').then(m => ({ default: m.ChoroplethMap })),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

export const metadata = { title: 'Panorama | Observatório Digital' };

export default function PanoramaPage() {
  const stats = getPanoramaStats();

  return (
    <SectionWrapper>
      <PageHeader
        title="Panorama do Mercado"
        description="Visão geral das plataformas de conteúdo digital e tendências de crescimento"
        badge="Atualizado: Jan 2025"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Plataformas monitoradas" value={stats.totalPlatforms}
          icon={<Globe className="h-4 w-4" />} />
        <StatCard title="Crescimento médio" value={`+${stats.avgGrowthRate.toFixed(1)}%`}
          trend={stats.avgGrowthRate} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard title="Top crescimento" value={`+${stats.topByGrowth[0]?.growthRate}%`}
          subtitle={stats.topByGrowth[0]?.name} icon={<BarChart2 className="h-4 w-4" />} />
        <StatCard title="Melhor monetização"
          value={`${stats.topByMonetization[0]?.monetizationPotential}/100`}
          subtitle={stats.topByMonetization[0]?.name} icon={<DollarSign className="h-4 w-4" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top 10 Plataformas por Crescimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <PanoramaChart />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Distribuição Geográfica das Plataformas</CardTitle>
        </CardHeader>
        <CardContent>
          <ChoroplethMap />
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
