'use client';

import { useState, useMemo } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { OpportunityCard } from '@/components/sections/Cards';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Zap } from 'lucide-react';
import { getOpportunities } from '@/lib/data';
import { useCSVExport } from '@/hooks/useCSVExport';

const NICHES = ['all', 'video', 'blog', 'podcast', 'social', 'newsletter', 'curso'];
const SORT_OPTIONS = [
  { value: 'score-desc', label: 'Maior score' },
  { value: 'score-asc', label: 'Menor score' },
  { value: 'growth-desc', label: 'Maior crescimento' },
  { value: 'competition-asc', label: 'Menor concorrência' },
];

export default function OportunidadesPage() {
  const [niche, setNiche] = useState('all');
  const [sort, setSort] = useState('score-desc');
  const { exportToCSV } = useCSVExport();
  const opportunities = useMemo(() => getOpportunities(), []);

  const filtered = useMemo(() => {
    let result = niche === 'all' ? opportunities : opportunities.filter(o => o.niche === niche);
    const [field, dir] = sort.split('-');
    result = [...result].sort((a, b) => {
      const av = field === 'score' ? a.score : field === 'growth' ? a.growthRate : a.competitionLevel;
      const bv = field === 'score' ? b.score : field === 'growth' ? b.growthRate : b.competitionLevel;
      return dir === 'desc' ? bv - av : av - bv;
    });
    return result;
  }, [opportunities, niche, sort]);

  return (
    <SectionWrapper>
      <PageHeader
        title="Oportunidades de Mercado"
        description="Plataformas ranqueadas por Score de Oportunidade: crescimento × concorrência × maturidade"
        badge={`${filtered.length} oportunidades`}
        action={
          <Button variant="outline" size="sm" className="gap-2" onClick={() =>
            exportToCSV(filtered.map(o => ({
              titulo: o.title, score: o.score, nicho: o.niche,
              crescimento: o.growthRate, concorrencia: o.competitionLevel,
            })), 'oportunidades-ranqueadas')
          }>
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
        }
      />

      {filtered.slice(0, 3).length > 0 && (
        <div className="mb-6 p-4 bg-brand-green/5 border border-brand-green/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-brand-green" />
            <span className="text-sm font-medium text-brand-green">Top 3 Agora</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {filtered.slice(0, 3).map(o => (
              <div key={o.id} className="text-sm">
                <div className="font-medium">{o.title}</div>
                <div className="text-muted-foreground text-xs">Score: {o.score}/100</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          {NICHES.map(n => (
            <Button key={n} variant={niche === n ? 'default' : 'outline'} size="sm"
              onClick={() => setNiche(n)} className="text-xs capitalize">
              {n === 'all' ? 'Todos' : n}
            </Button>
          ))}
        </div>
        <Select value={sort} onValueChange={v => v && setSort(v)}>
          <SelectTrigger className="w-44 h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(o => (
              <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Score = (crescimento × 0.4) + ((100 − concorrência) × 0.35) + (bônus maturidade × 0.25)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(o => <OpportunityCard key={o.id} opportunity={o} />)}
      </div>
    </SectionWrapper>
  );
}
