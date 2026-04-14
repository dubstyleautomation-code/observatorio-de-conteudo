import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modelos de Monetização | Observatório Digital',
  description: 'Compare modelos de receita por plataforma, dificuldade e potencial de ganho em BRL',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
