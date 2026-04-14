import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explorador de Plataformas | Observatório Digital',
  description: 'Explore e filtre mais de 40 plataformas de conteúdo digital',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
