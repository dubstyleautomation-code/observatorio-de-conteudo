'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { platforms } from '@/lib/data';
import { useTheme } from 'next-themes';
import { ChartSkeleton } from '@/components/layout/LoadingState';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export function ChoroplethMap() {
  const { theme } = useTheme();

  const { locations, values } = useMemo(() => {
    const regionCount: Record<string, number> = {};
    platforms.forEach(p => {
      p.regions.forEach(r => {
        regionCount[r] = (regionCount[r] || 0) + 1;
      });
    });
    return {
      locations: Object.keys(regionCount),
      values: Object.values(regionCount),
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <Plot
      data={[{
        type: 'choropleth' as const,
        locationmode: 'ISO-3',
        locations,
        z: values,
        colorscale: [[0, '#1e293b'], [0.5, '#059669'], [1, '#34d399']],
        hovertemplate: '%{location}: %{z} plataformas<extra></extra>',
        showscale: false,
      }]}
      layout={{
        geo: {
          showframe: false,
          showcoastlines: false,
          bgcolor: 'transparent',
          landcolor: isDark ? '#1e293b' : '#e2e8f0',
          countrycolor: isDark ? '#334155' : '#cbd5e1',
          showocean: true,
          oceancolor: isDark ? '#0f172a' : '#f8fafc',
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: { t: 0, b: 0, l: 0, r: 0 },
        height: 280,
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: '100%' }}
    />
  );
}
