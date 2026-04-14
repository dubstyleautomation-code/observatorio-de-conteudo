'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { platforms } from '@/lib/data';

const AVAILABLE = ['youtube','tiktok','instagram','substack-blog','hotmart','spotify-podcasts','linkedin','beehiiv'];

export default function AnalisesPage() {
  const [selected, setSelected] = useState(['youtube', 'tiktok', 'instagram']);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(x => x !== id) : prev
        : prev.length < 4 ? [...prev, id] : prev
    );
  };

  return (
    <SectionWrapper>
      <PageHeader
        title="Análises Comparativas"
        description="Compare a evolução de crescimento entre plataformas ao longo do tempo"
      />

      <Card className="mb-6">
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground mb-3">Selecione até 4 plataformas</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE.map(id => {
              const p = platforms.find(x => x.id === id);
              const isSelected = selected.includes(id);
              return (
                <Button key={id} variant={isSelected ? 'default' : 'outline'} size="sm"
                  onClick={() => toggle(id)} disabled={!isSelected && selected.length >= 4}
                  className="text-xs">
                  {p?.name ?? id}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base">Crescimento Mensal — Jan a Dez 2024</CardTitle>
            <div className="flex gap-1 flex-wrap">
              {selected.map(id => (
                <Badge key={id} variant="secondary" className="text-xs">
                  {platforms.find(p => p.id === id)?.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <TimeSeriesChart platformIds={selected} />
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
