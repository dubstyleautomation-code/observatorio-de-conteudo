export interface Platform {
  id: string;
  name: string;
  category: 'video' | 'blog' | 'podcast' | 'social' | 'newsletter' | 'curso';
  description: string;
  url: string;
  monthlyVisits: number;
  growthRate: number;
  competitionLevel: number;
  maturityScore: number;
  monetizationPotential: number;
  regions: string[];
  tags: string[];
  isFavorite?: boolean;
}

export interface TimeSeriesData {
  platformId: string;
  data: Array<{ month: string; visitors: number; growth: number }>;
}

export interface MonetizationModel {
  id: string;
  name: string;
  type: 'ads' | 'subscription' | 'affiliate' | 'sponsorship' | 'digital-product' | 'service';
  platforms: string[];
  avgMonthlyRevenue: { min: number; max: number };
  difficulty: 'low' | 'medium' | 'high';
  timeToFirstRevenue: string;
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  niche: string;
  platformIds: string[];
  score: number;
  growthRate: number;
  competitionLevel: number;
  maturityBonus: number;
  description: string;
  tags: string[];
}

export interface GeminiRequest {
  tool: 'trend-analysis' | 'content-strategy' | 'monetization' | 'opportunities' | 'benchmarking';
  userInput: string;
  context?: Record<string, unknown>;
}

export interface GeminiResponse {
  success: boolean;
  content: string;
  error?: string;
}

export type SectionId = 'panorama' | 'explorador' | 'analises' | 'monetizacao' | 'oportunidades' | 'laboratorio';
