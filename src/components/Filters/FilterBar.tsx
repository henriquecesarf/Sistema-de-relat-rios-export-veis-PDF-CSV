import { memo, useCallback } from 'react';
import type { FilterState } from '../../types';
import { CATEGORIES, REGIONS, STATUSES } from '../../data/mockData';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterBar = memo(function FilterBar({
  filters,
  onChange,
  onReset,
}: FilterBarProps) {
  const set = useCallback(
    (field: keyof FilterState, value: string) => {
      onChange({ ...filters, [field]: value });
    },
    [filters, onChange],
  );

  const inputCls =
    'px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer';

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-3">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1">
        🔍 Filtros
      </span>
      <div className="flex flex-wrap gap-3 items-end">
        <label className="flex flex-col gap-1 min-w-[130px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">De</span>
          <input type="date" value={filters.dateFrom} max={filters.dateTo} onChange={(e) => set('dateFrom', e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1 min-w-[130px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Até</span>
          <input type="date" value={filters.dateTo} min={filters.dateFrom} onChange={(e) => set('dateTo', e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1 min-w-[130px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Categoria</span>
          <select value={filters.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 min-w-[120px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Região</span>
          <select value={filters.region} onChange={(e) => set('region', e.target.value)} className={inputCls}>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 min-w-[120px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Status</span>
          <select value={filters.status} onChange={(e) => set('status', e.target.value)} className={inputCls}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <button
          onClick={onReset}
          title="Limpar filtros"
          className="self-end px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors cursor-pointer"
        >
          ✕ Limpar
        </button>
      </div>
    </div>
  );
});
