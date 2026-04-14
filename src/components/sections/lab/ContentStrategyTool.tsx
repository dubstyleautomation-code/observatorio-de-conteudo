'use client';

import { useState } from 'react';
import { AIToolBase } from './AIToolBase';
import { useGemini } from '@/hooks/useGemini';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { platforms } from '@/lib/data';

export function ContentStrategyTool() {
  const { isLoading, result, error, generate, reset } = useGemini();
  const [platform, setPlatform] = useState('');
  return (
    <AIToolBase
      title="Gerador de Estratégia de Conteúdo"
      description="Informe seu nicho e plataforma para receber um plano de conteúdo de 30 dias."
      placeholder="Ex: Sou nutricionista e quero criar conteúdo sobre alimentação saudável..."
      buttonLabel="Gerar Estratégia"
      isLoading={isLoading} result={result} error={error} onReset={reset}
      onSubmit={input => generate({ tool: 'content-strategy', userInput: input,
        context: { platform: platform || 'não especificado' } })}
    >
      <Select value={platform} onValueChange={v => v && setPlatform(v)}>
        <SelectTrigger className="text-xs h-8">
          <SelectValue placeholder="Selecione a plataforma principal (opcional)" />
        </SelectTrigger>
        <SelectContent>
          {platforms.slice(0, 20).map(p => (
            <SelectItem key={p.id} value={p.name} className="text-xs">{p.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </AIToolBase>
  );
}
