import { useState, useMemo } from 'react';
import type { FilterState, SaleRecord } from '../types';
import { mockSales } from '../data/mockData';

const today = new Date().toISOString().split('T')[0];
const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

const initialFilter: FilterState = {
  dateFrom: yearAgo,
  dateTo: today,
  category: 'Todas',
  region: 'Todas',
  status: 'Todos',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilter);

  const filteredData = useMemo<SaleRecord[]>(() => {
    return mockSales.filter((record) => {
      if (record.date < filters.dateFrom) return false;
      if (record.date > filters.dateTo) return false;
      if (filters.category !== 'Todas' && record.category !== filters.category)
        return false;
      if (filters.region !== 'Todas' && record.region !== filters.region)
        return false;
      if (filters.status !== 'Todos' && record.status !== filters.status)
        return false;
      return true;
    });
  }, [filters]);

  const totalRevenue = useMemo(
    () => filteredData.reduce((acc, r) => acc + r.amount, 0),
    [filteredData],
  );

  const completedCount = useMemo(
    () => filteredData.filter((r) => r.status === 'Concluído').length,
    [filteredData],
  );

  const pendingCount = useMemo(
    () => filteredData.filter((r) => r.status === 'Pendente').length,
    [filteredData],
  );

  return {
    filters,
    setFilters,
    filteredData,
    totalRevenue,
    completedCount,
    pendingCount,
    resetFilters: () => setFilters(initialFilter),
  };
}
