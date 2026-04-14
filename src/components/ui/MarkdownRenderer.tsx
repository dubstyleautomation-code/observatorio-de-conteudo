'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    async function render() {
      const [{ marked }, { default: DOMPurify }] = await Promise.all([
        import('marked'),
        import('dompurify'),
      ]);
      marked.setOptions({ breaks: true, gfm: true });
      const rawHtml = await marked.parse(content);
      const clean = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: ['p','h1','h2','h3','h4','ul','ol','li','strong','em',
          'code','pre','blockquote','a','br','table','thead','tbody','tr','th','td'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      });
      setHtml(clean);
    }
    if (content) render();
  }, [content]);

  return (
    <div
      className={cn('prose prose-slate dark:prose-invert max-w-none text-sm', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
