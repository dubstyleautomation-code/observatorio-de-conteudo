import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análises Comparativas | Observatório Digital',
  description: 'Compare a evolução de crescimento entre plataformas de conteúdo digital',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
