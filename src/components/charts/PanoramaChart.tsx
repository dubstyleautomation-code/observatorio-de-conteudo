'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from 'next-themes';
import { platforms } from '@/lib/data';

export function PanoramaChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const top10 = [...platforms].sort((a, b) => b.growthRate - a.growthRate).slice(0, 10);
    const isDark = theme === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: top10.map(p => p.name),
        datasets: [{
          label: 'Taxa de Crescimento (%)',
          data: top10.map(p => p.growthRate),
          backgroundColor: top10.map(p =>
            p.growthRate >= 20 ? 'rgba(5, 150, 105, 0.8)' :
            p.growthRate >= 10 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(139, 92, 246, 0.8)'
          ),
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => { const y = ctx.parsed.y ?? 0; return ` ${y >= 0 ? '+' : ''}${y}%`; } } },
        },
        scales: {
          y: { ticks: { color: textColor }, grid: { color: gridColor } },
          x: { ticks: { color: textColor, maxRotation: 45 }, grid: { display: false } },
        },
      },
    });
    return () => { chartRef.current?.destroy(); };
  }, [theme]);

  return <canvas ref={canvasRef} />;
}
