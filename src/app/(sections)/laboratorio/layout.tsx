import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab IA | Observatório Digital',
  description: '5 ferramentas de inteligência artificial powered by Gemini para criadores de conteúdo',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
