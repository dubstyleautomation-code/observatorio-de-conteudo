import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Observatório de Conteúdo Digital',
  description: 'Inteligência de mercado para criadores de conteúdo — dados, tendências e IA para crescer nas plataformas digitais',
  keywords: ['criadores de conteúdo', 'tendências digitais', 'monetização', 'YouTube', 'TikTok', 'newsletter'],
  authors: [{ name: 'Observatório Digital' }],
  openGraph: {
    title: 'Observatório de Conteúdo Digital',
    description: 'Inteligência de mercado para criadores',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t py-4 text-center text-sm text-muted-foreground">
              © 2024 Observatório de Conteúdo Digital · Dados atualizados mensalmente
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
