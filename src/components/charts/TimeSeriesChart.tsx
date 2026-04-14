'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from 'next-themes';
import { getTimeSeriesForPlatform } from '@/lib/data';

const COLORS = ['#059669','#3B82F6','#8B5CF6','#F59E0B','#EF4444','#06B6D4','#EC4899','#84CC16'];

export function TimeSeriesChart({ platformIds }: { platformIds: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current || !platformIds.length) return;
    if (chartRef.current) chartRef.current.destroy();

    const isDark = theme === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    const series = platformIds.map((id, i) => {
      const ts = getTimeSeriesForPlatform(id);
      return {
        label: id,
        data: ts?.data.map(d => d.growth) ?? [],
        borderColor: COLORS[i % COLORS.length],
        backgroundColor: COLORS[i % COLORS.length] + '20',
        tension: 0.4, fill: false, pointRadius: 3,
      };
    });

    const labels = getTimeSeriesForPlatform(platformIds[0])?.data.map(d => d.month) ?? [];

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: { labels, datasets: series },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor, boxWidth: 12 } },
          tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: +${ctx.parsed.y}%` } },
        },
        scales: {
          y: { ticks: { color: textColor, callback: v => `${v}%` }, grid: { color: gridColor } },
          x: { ticks: { color: textColor }, grid: { display: false } },
        },
      },
    });
    return () => { chartRef.current?.destroy(); };
  }, [platformIds, theme]);

  return <canvas ref={canvasRef} />;
}
