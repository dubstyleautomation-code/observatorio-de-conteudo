'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, FileText, DollarSign, Lightbulb, BarChart2 } from 'lucide-react';
import { TrendAnalysisTool } from '@/components/sections/lab/TrendAnalysisTool';
import { ContentStrategyTool } from '@/components/sections/lab/ContentStrategyTool';
import { MonetizationTool } from '@/components/sections/lab/MonetizationTool';
import { OpportunitiesTool } from '@/components/sections/lab/OpportunitiesTool';
import { BenchmarkingTool } from '@/components/sections/lab/BenchmarkingTool';

const TOOLS = [
  { value: 'trend', label: 'Tendências', icon: TrendingUp, component: TrendAnalysisTool },
  { value: 'strategy', label: 'Estratégia', icon: FileText, component: ContentStrategyTool },
  { value: 'monetization', label: 'Monetização', icon: DollarSign, component: MonetizationTool },
  { value: 'opportunities', label: 'Oportunidades', icon: Lightbulb, component: OpportunitiesTool },
  { value: 'benchmarking', label: 'Benchmark', icon: BarChart2, component: BenchmarkingTool },
];

export default function LaboratorioPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Laboratório de IA"
        description="5 ferramentas powered by Gemini 2.0 Flash para acelerar sua estratégia de conteúdo"
        badge="Powered by Gemini"
      />
      <Tabs defaultValue="trend" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto gap-1 mb-6">
          {TOOLS.map(tool => (
            <TabsTrigger key={tool.value} value={tool.value}
              className="flex items-center gap-1.5 text-xs py-2">
              <tool.icon className="h-3.5 w-3.5" />
              {tool.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TOOLS.map(tool => (
          <TabsContent key={tool.value} value={tool.value}>
            <tool.component />
          </TabsContent>
        ))}
      </Tabs>
    </SectionWrapper>
  );
}
