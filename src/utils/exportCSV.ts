import type { SaleRecord } from '../types';

function escapeCsv(value: string | number): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV(data: SaleRecord[], filename = 'relatorio') {
  const headers = ['ID', 'Data', 'Categoria', 'Região', 'Vendedor', 'Valor (R$)', 'Status'];

  const rows = data.map((record) => [
    record.id,
    record.date,
    record.category,
    record.region,
    record.salesperson,
    record.amount.toFixed(2).replace('.', ','),
    record.status,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(','))
    .join('\n');

  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
