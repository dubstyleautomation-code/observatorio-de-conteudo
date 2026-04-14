import platformsData from '@/data/platforms.json';
import timeSeriesData from '@/data/timeSeries.json';
import monetizationData from '@/data/monetization.json';
import type { Platform, TimeSeriesData, MonetizationModel, Opportunity } from '@/types';

export const platforms = platformsData as Platform[];
export const allTimeSeries = timeSeriesData as TimeSeriesData[];
export const monetizationModels = monetizationData as MonetizationModel[];

export function getPlatformById(id: string): Platform | undefined {
  return platforms.find(p => p.id === id);
}

export function getPlatformsByCategory(category: Platform['category']): Platform[] {
  return platforms.filter(p => p.category === category);
}

export function searchPlatforms(query: string): Platform[] {
  const lower = query.toLowerCase();
  return platforms.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower) ||
    p.tags.some(t => t.toLowerCase().includes(lower))
  );
}

export function calculateOpportunityScore(platform: Platform): number {
  const growthNormalized = Math.min(platform.growthRate, 50) / 50 * 100;
  const competitionInverse = 100 - platform.competitionLevel;
  const maturityBonus = platform.maturityScore < 50 ? 20 : 0;
  return Math.round(
    (growthNormalized * 0.4) + (competitionInverse * 0.35) + (maturityBonus * 0.25)
  );
}

export function getOpportunities(): Opportunity[] {
  return platforms
    .map(p => ({
      id: `opp-${p.id}`,
      title: `Oportunidade em ${p.name}`,
      niche: p.category,
      platformIds: [p.id],
      score: calculateOpportunityScore(p),
      growthRate: p.growthRate,
      competitionLevel: p.competitionLevel,
      maturityBonus: p.maturityScore < 50 ? 20 : 0,
      description: p.description,
      tags: p.tags,
    }))
    .sort((a, b) => b.score - a.score);
}

export function getTimeSeriesForPlatform(platformId: string): TimeSeriesData | undefined {
  return allTimeSeries.find(ts => ts.platformId === platformId);
}

export function getPanoramaStats() {
  return {
    totalPlatforms: platforms.length,
    avgGrowthRate: platforms.reduce((acc, p) => acc + p.growthRate, 0) / platforms.length,
    categoryCounts: platforms.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    topByGrowth: [...platforms].sort((a, b) => b.growthRate - a.growthRate).slice(0, 5),
    topByMonetization: [...platforms].sort((a, b) => b.monetizationPotential - a.monetizationPotential).slice(0, 5),
  };
}
