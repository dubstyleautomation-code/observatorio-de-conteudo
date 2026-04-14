'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { Sparkles, RotateCcw, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface AIToolBaseProps {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel?: string;
  isLoading: boolean;
  result: string | null;
  error: string | null;
  onSubmit: (input: string) => void;
  onReset: () => void;
  children?: React.ReactNode;
}

export function AIToolBase({
  title, description, placeholder, buttonLabel = 'Analisar com IA',
  isLoading, result, error, onSubmit, onReset, children
}: AIToolBaseProps) {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-3">
        {children}
        <Textarea placeholder={placeholder} value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          rows={3} className="text-sm resize-none" />
        <div className="flex gap-2">
          <Button onClick={() => onSubmit(input)} disabled={isLoading || !input.trim()}
            className="gap-2 bg-brand-green hover:bg-brand-green/90">
            <Sparkles className="h-4 w-4" />
            {isLoading ? 'Analisando...' : buttonLabel}
          </Button>
          {(result || error) && (
            <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Limpar
            </Button>
          )}
        </div>
      </div>

      {isLoading && (
        <Card><CardContent className="pt-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4" style={{ width: `${100 - i * 8}%` }} />
          ))}
        </CardContent></Card>
      )}

      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="pt-4 text-sm text-red-600 dark:text-red-400">Erro: {error}</CardContent>
        </Card>
      )}

      {result && !isLoading && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-end mb-2">
              <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                {copied ? <Check className="h-3.5 w-3.5 text-brand-green" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
            <MarkdownRenderer content={result} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
