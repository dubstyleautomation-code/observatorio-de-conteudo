import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { GeminiResponse } from '@/types';

const RequestSchema = z.object({
  tool: z.enum(['trend-analysis', 'content-strategy', 'monetization', 'opportunities', 'benchmarking']),
  userInput: z.string().min(1).max(2000),
  context: z.record(z.string(), z.unknown()).optional(),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  'trend-analysis': `You are a digital content market analyst specializing in Brazilian content trends.
    Analyze the given niche and provide: 1) Current trend status, 2) Growth trajectory (3-6 months),
    3) Key audience segments, 4) Content format recommendations, 5) Top 3 actionable insights.
    Format your response in clear Markdown with headers and bullet points. Be specific and data-driven.`,
  'content-strategy': `You are a content strategy expert for Brazilian digital creators.
    Create a 30-day content strategy including: 1) Content pillars (3-5), 2) Weekly posting cadence,
    3) Content formats per platform, 4) Engagement hooks, 5) CTAs for monetization.
    Use Markdown formatting. Be practical and actionable.`,
  'monetization': `You are a monetization consultant for digital content creators in Brazil.
    Analyze the given context and provide: 1) Top 3 revenue streams for this profile,
    2) 90-day monetization roadmap, 3) Revenue potential estimates (in BRL),
    4) Quick wins (first 30 days), 5) Long-term strategy.
    Format in Markdown. Include realistic BRL revenue ranges.`,
  'opportunities': `You are a market opportunity analyst for digital content in Brazil.
    Identify: 1) Top 3 underserved niches in this space, 2) Blue ocean opportunities,
    3) Emerging platform trends, 4) Audience gaps, 5) First-mover advantages available.
    Use Markdown with clear sections. Be specific about why each opportunity exists now.`,
  'benchmarking': `You are a competitive intelligence specialist for Brazilian digital creators.
    Perform a competitive analysis: 1) Main competitors profile, 2) Content gap analysis,
    3) Differentiation opportunities, 4) Benchmark metrics to aim for,
    5) Competitive advantages to build. Format in Markdown with comparative tables where useful.`,
};

const GROQ_MODEL = 'llama-3.3-70b-versatile';

export async function POST(request: NextRequest): Promise<NextResponse<GeminiResponse>> {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, content: '', error: 'API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, content: '', error: 'Invalid request: ' + parsed.error.message },
        { status: 400 }
      );
    }

    const { tool, userInput, context } = parsed.data;
    const systemPrompt = SYSTEM_PROMPTS[tool];
    const contextStr = context ? `\n\nContext data: ${JSON.stringify(context, null, 2)}` : '';

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput + contextStr },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errBody = await groqResponse.text();
      return NextResponse.json(
        { success: false, content: '', error: `AI API error: ${groqResponse.status} — ${errBody.slice(0, 120)}` },
        { status: 502 }
      );
    }

    const groqData = await groqResponse.json();
    const content = groqData?.choices?.[0]?.message?.content ?? '';

    if (!content) {
      return NextResponse.json(
        { success: false, content: '', error: 'Empty response from AI' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('[/api/gemini] Error:', error);
    return NextResponse.json(
      { success: false, content: '', error: 'Internal server error' },
      { status: 500 }
    );
  }
}
