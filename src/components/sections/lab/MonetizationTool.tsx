'use client';

import { AIToolBase } from './AIToolBase';
import { useGemini } from '@/hooks/useGemini';

export function MonetizationTool() {
  const { isLoading, result, error, generate, reset } = useGemini();
  return (
    <AIToolBase
      title="Análise de Monetização Personalizada"
      description="Descreva seu perfil de criador para receber um roadmap de monetização com estimativas em BRL."
      placeholder="Ex: Tenho um canal no YouTube com 8k inscritos sobre programação, publico 2x por semana..."
      buttonLabel="Analisar Monetização"
      isLoading={isLoading} result={result} error={error} onReset={reset}
      onSubmit={input => generate({ tool: 'monetization', userInput: input })}
    />
  );
}
