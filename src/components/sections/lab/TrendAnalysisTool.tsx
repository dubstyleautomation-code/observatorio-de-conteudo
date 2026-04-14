'use client';

import { AIToolBase } from './AIToolBase';
import { useGemini } from '@/hooks/useGemini';

export function TrendAnalysisTool() {
  const { isLoading, result, error, generate, reset } = useGemini();
  return (
    <AIToolBase
      title="Análise de Tendência de Nicho"
      description="Descreva um nicho e receba análise de tendências, crescimento e recomendações de formato."
      placeholder="Ex: Conteúdo sobre finanças pessoais para jovens no TikTok..."
      buttonLabel="Analisar Tendência"
      isLoading={isLoading} result={result} error={error} onReset={reset}
      onSubmit={input => generate({ tool: 'trend-analysis', userInput: input })}
    />
  );
}
