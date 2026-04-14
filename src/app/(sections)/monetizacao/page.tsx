'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download } from 'lucide-react';
import { monetizationModels } from '@/lib/data';
import { useCSVExport } from '@/hooks/useCSVExport';
import { cn } from '@/lib/utils';
import type { MonetizationModel } from '@/types';

const TYPE_LABELS: Record<MonetizationModel['type'], string> = {
  ads: 'Publicidade', subscription: 'Assinatura', affiliate: 'Afiliado',
  sponsorship: 'Patrocínio', 'digital-product': 'Produto Digital', service: 'Serviço',
};

const DIFFICULTY = {
  low: { label: 'Fácil', color: 'text-brand-green bg-brand-green/10', progress: 30 },
  medium: { label: 'Médio', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20', progress: 60 },
  high: { label: 'Difícil', color: 'text-red-600 bg-red-100 dark:bg-red-900/20', progress: 90 },
};

export default function MonetizacaoPage() {
  const [activeType, setActiveType] = useState('all');
  const { exportToCSV } = useCSVExport();

  const types = ['all', ...Array.from(new Set(monetizationModels.map(m => m.type)))];
  const filtered = activeType === 'all'
    ? monetizationModels
    : monetizationModels.filter(m => m.type === activeType);

  return (
    <SectionWrapper>
      <PageHeader
        title="Modelos de Monetização"
        description="Compare modelos de receita por plataforma, dificuldade e potencial de ganho"
        action={
          <Button variant="outline" size="sm" className="gap-2" onClick={() =>
            exportToCSV(filtered.map(m => ({
              nome: m.name, tipo: m.type,
              receita_min: m.avgMonthlyRevenue.min, receita_max: m.avgMonthlyRevenue.max,
              dificuldade: m.difficulty, tempo: m.timeToFirstRevenue,
            })), 'modelos-monetizacao')
          }>
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <Button key={t} variant={activeType === t ? 'default' : 'outline'} size="sm"
            onClick={() => setActiveType(t)} className="text-xs capitalize">
            {t === 'all' ? 'Todos' : TYPE_LABELS[t as MonetizationModel['type']]}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(model => {
          const diff = DIFFICULTY[model.difficulty];
          return (
            <Card key={model.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold leading-tight">{model.name}</CardTitle>
                  <Badge className={cn('text-xs shrink-0', diff.color)}>{diff.label}</Badge>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  {TYPE_LABELS[model.type]}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">{model.description}</p>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Potencial mensal</span>
                    <span className="font-medium text-brand-green">
                      R$ {model.avgMonthlyRevenue.min.toLocaleString('pt-BR')} –
                      R$ {model.avgMonthlyRevenue.max.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <Progress value={diff.progress} className="h-1" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Primeiro ganho</span>
                  <span className="font-medium">{model.timeToFirstRevenue}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
