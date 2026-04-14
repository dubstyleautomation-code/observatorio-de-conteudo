'use client';

import { motion } from 'framer-motion';
import { Heart, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Platform, Opportunity } from '@/types';

// StatCard — Panorama metrics
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, subtitle, trend, icon }: StatCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className="h-full gap-2 py-3 border border-border">
        <CardHeader className="flex flex-row items-center justify-between px-4 pb-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </CardHeader>
        <CardContent className="px-4">
          <div className="text-2xl font-bold">{value}</div>
          {(subtitle || trend !== undefined) && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              {trend !== undefined && (
                trend >= 0
                  ? <TrendingUp className="h-3 w-3 text-brand-green" />
                  : <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              {subtitle && <span>{subtitle}</span>}
              {trend !== undefined && (
                <span className={trend >= 0 ? 'text-brand-green' : 'text-red-500'}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// PlatformCard — Explorador list
interface PlatformCardProps {
  platform: Platform;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  video: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  blog: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  podcast: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  social: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  newsletter: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  curso: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export function PlatformCard({ platform, isFavorite, onFavoriteToggle }: PlatformCardProps) {
  const handleCardClick = () => {
    if (platform.url) window.open(platform.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}>
      <Card
        className="h-full gap-2 py-3 border border-border hover:border-primary/60 hover:shadow-md transition-all cursor-pointer"
        onClick={handleCardClick}
        role="link"
        aria-label={`Abrir ${platform.name}`}
      >
        <CardHeader className="pb-1 px-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base">{platform.name}</CardTitle>
              <Badge className={cn('text-xs mt-1', categoryColors[platform.category])}>
                {platform.category}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mt-1"
              onClick={e => { e.stopPropagation(); onFavoriteToggle(platform.id); }}>
              <Heart className={cn('h-4 w-4', isFavorite
                ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 px-4">
          <p className="text-xs text-muted-foreground line-clamp-2">{platform.description}</p>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Crescimento</span>
            <span className={platform.growthRate >= 0
              ? 'text-brand-green font-medium' : 'text-red-500 font-medium'}>
              {platform.growthRate >= 0 ? '+' : ''}{platform.growthRate}%
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Monetização</span>
            <span className="font-medium">{platform.monetizationPotential}/100</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {platform.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// OpportunityCard — Oportunidades section
interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const scoreColor = opportunity.score >= 70 ? 'text-brand-green'
    : opportunity.score >= 40 ? 'text-yellow-500' : 'text-red-500';
  const borderColor = opportunity.score >= 70 ? '#059669'
    : opportunity.score >= 40 ? '#EAB308' : '#EF4444';

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
      <Card className="h-full gap-2 py-3 border border-l-4" style={{ borderLeftColor: borderColor }}>
        <CardHeader className="pb-0 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">{opportunity.title}</CardTitle>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span className={cn('text-lg font-bold', scoreColor)}>{opportunity.score}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 px-4">
          <p className="text-xs text-muted-foreground line-clamp-2">{opportunity.description}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Crescimento</span>
              <div className="font-medium text-brand-green">+{opportunity.growthRate}%</div>
            </div>
            <div>
              <span className="text-muted-foreground">Concorrência</span>
              <div className="font-medium">{opportunity.competitionLevel}/100</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {opportunity.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
