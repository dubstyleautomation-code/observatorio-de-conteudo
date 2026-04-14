'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { PlatformCard } from '@/components/sections/Cards';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Heart } from 'lucide-react';
import { platforms, searchPlatforms } from '@/lib/data';
import { useFavorites } from '@/hooks/useFavorites';
import { useDebounce } from '@/hooks/useDebounce';
import { useCSVExport } from '@/hooks/useCSVExport';
import type { Platform } from '@/types';

const CATEGORIES: Array<{ value: Platform['category'] | 'all' | 'favorites'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'video', label: 'Vídeo' },
  { value: 'blog', label: 'Blog' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'social', label: 'Social' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'curso', label: 'Cursos' },
  { value: 'favorites', label: 'Favoritos' },
];

export default function ExploradorPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { toggle, isFavorite, favorites } = useFavorites();
  const { exportToCSV } = useCSVExport();
  const debouncedSearch = useDebounce(search, 300);

  const filtered = (() => {
    let result = debouncedSearch ? searchPlatforms(debouncedSearch) : platforms;
    if (activeCategory === 'favorites') {
      result = result.filter(p => isFavorite(p.id));
    } else if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    return result;
  })();

  const handleExport = () => {
    exportToCSV(
      filtered.map(p => ({
        nome: p.name, categoria: p.category, crescimento: p.growthRate,
        monetizacao: p.monetizationPotential, url: p.url
      })),
      'plataformas-observatorio'
    );
  };

  return (
    <SectionWrapper>
      <PageHeader
        title="Explorador de Plataformas"
        description={`${platforms.length} plataformas catalogadas`}
        action={
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
        }
      />

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar plataforma, categoria, tag..."
          className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <Button key={cat.value} variant={activeCategory === cat.value ? 'default' : 'outline'}
            size="sm" onClick={() => setActiveCategory(cat.value)} className="text-xs">
            {cat.value === 'favorites' && <Heart className="h-3 w-3 mr-1" />}
            {cat.label}
            {cat.value === 'favorites' && favorites.size > 0 && (
              <Badge className="ml-1 h-4 text-[10px]">{favorites.size}</Badge>
            )}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {filtered.length} plataforma{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>Nenhuma plataforma encontrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(platform => (
            <PlatformCard key={platform.id} platform={platform}
              isFavorite={isFavorite(platform.id)} onFavoriteToggle={toggle} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
