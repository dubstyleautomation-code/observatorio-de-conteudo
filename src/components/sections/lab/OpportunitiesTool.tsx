'use client';

import { AIToolBase } from './AIToolBase';
import { useGemini } from '@/hooks/useGemini';

export function OpportunitiesTool() {
  const { isLoading, result, error, generate, reset } = useGemini();
  return (
    <AIToolBase
      title="Identificador de Oportunidades Emergentes"
      description="Informe sua área de interesse e descubra nichos e plataformas subutilizadas."
      placeholder="Ex: Tenho experiência em marketing digital e quero encontrar nichos pouco explorados..."
      buttonLabel="Encontrar Oportunidades"
      isLoading={isLoading} result={result} error={error} onReset={reset}
      onSubmit={input => generate({ tool: 'opportunities', userInput: input })}
    />
  );
}
