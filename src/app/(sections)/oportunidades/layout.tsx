import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oportunidades de Mercado | Observatório Digital',
  description: 'Plataformas ranqueadas por score de oportunidade: crescimento, concorrência e maturidade',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
