import { useCallback } from 'react';

export function useCSVExport() {
  const exportToCSV = useCallback(<T extends Record<string, unknown>>(
    data: T[],
    filename: string
  ) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row =>
        headers.map(h => {
          const val = row[h];
          const str = Array.isArray(val) ? val.join(';') : String(val ?? '');
          return str.includes(',') ? `"${str}"` : str;
        }).join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return { exportToCSV };
}
