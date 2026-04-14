'use client';

import { AIToolBase } from './AIToolBase';
import { useGemini } from '@/hooks/useGemini';

export function BenchmarkingTool() {
  const { isLoading, result, error, generate, reset } = useGemini();
  return (
    <AIToolBase
      title="Benchmarking Competitivo"
      description="Informe seu nicho e perfil atual para receber análise competitiva e metas de benchmark."
      placeholder="Ex: Crio conteúdo de viagens no Instagram (12k seguidores, 3% engajamento)..."
      buttonLabel="Analisar Benchmark"
      isLoading={isLoading} result={result} error={error} onReset={reset}
      onSubmit={input => generate({ tool: 'benchmarking', userInput: input })}
    />
  );
}
