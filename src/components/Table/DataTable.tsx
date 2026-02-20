import { memo, useState, useMemo } from 'react';
import type { SaleRecord } from '../../types';

interface DataTableProps {
  data: SaleRecord[];
}

type SortKey = keyof SaleRecord;
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 10;

const STATUS_BADGE: Record<string, string> = {
  'Concluído': 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  Pendente: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  Cancelado: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const DataTable = memo(function DataTable({ data }: DataTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp =
        typeof aVal === 'number' && typeof bVal === 'number'
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  function sortIcon(key: SortKey) {
    if (key !== sortKey) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'date', label: 'Data' },
    { key: 'category', label: 'Categoria' },
    { key: 'region', label: 'Região' },
    { key: 'salesperson', label: 'Vendedor(a)' },
    { key: 'amount', label: 'Valor' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
        {data.length} registro{data.length !== 1 ? 's' : ''}
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap border-b border-gray-200 dark:border-gray-700 transition-colors ${
                    sortKey === key
                      ? 'text-blue-500'
                      : 'text-gray-400 dark:text-gray-500 hover:text-blue-500'
                  }`}
                >
                  {label}{' '}
                  <span className={sortKey === key ? 'opacity-100' : 'opacity-40'}>
                    {sortIcon(key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400 dark:text-gray-500">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              slice.map((row) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 border-gray-100 dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-400 dark:text-gray-500">{row.id}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.date}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.category}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.region}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.salesperson}</td>
                  <td className="px-4 py-3 font-semibold text-blue-500">{formatCurrency(row.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[row.status] ?? ''}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-4 pt-1">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          ‹ Anterior
        </button>
        <span className="text-sm text-gray-400 dark:text-gray-500">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Próxima ›
        </button>
      </div>
    </div>
  );
});
