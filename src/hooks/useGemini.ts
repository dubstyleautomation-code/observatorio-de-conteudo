'use client';

import { useState, useCallback } from 'react';
import type { GeminiRequest, GeminiResponse } from '@/types';

interface UseGeminiState {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

export function useGemini() {
  const [state, setState] = useState<UseGeminiState>({
    isLoading: false,
    result: null,
    error: null,
  });

  const generate = useCallback(async (request: GeminiRequest) => {
    setState({ isLoading: true, result: null, error: null });
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const data: GeminiResponse = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error ?? 'Request failed');
      }
      setState({ isLoading: false, result: data.content, error: null });
    } catch (err) {
      setState({
        isLoading: false,
        result: null,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, result: null, error: null });
  }, []);

  return { ...state, generate, reset };
}
