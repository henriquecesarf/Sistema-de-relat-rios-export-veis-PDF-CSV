import { useMemo } from 'react';
import type { SaleRecord, MonthlyRevenue, CategoryData, StatusData } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useChartData(data: SaleRecord[]) {
  const monthlyRevenue = useMemo<MonthlyRevenue[]>(() => {
    const map = new Map<string, number>();
    data.forEach((record) => {
      const key = format(new Date(record.date + 'T12:00:00'), 'MMM/yy', {
        locale: ptBR,
      });
      map.set(key, (map.get(key) ?? 0) + record.amount);
    });

    const sorted = Array.from(map.entries())
      .sort(([a], [b]) => {
        // Reconstruct to sort properly by date
        const parseKey = (k: string) => {
          const found = data.find(
            (r) =>
              format(new Date(r.date + 'T12:00:00'), 'MMM/yy', {
                locale: ptBR,
              }) === k,
          );
          return found?.date ?? '';
        };
        return parseKey(a).localeCompare(parseKey(b));
      })
      .slice(-12);

    const avg =
      sorted.reduce((acc, [, v]) => acc + v, 0) / (sorted.length || 1);

    return sorted.map(([month, receita]) => ({
      month: month.charAt(0).toUpperCase() + month.slice(1),
      receita: Math.round(receita),
      meta: Math.round(avg * 1.1),
    }));
  }, [data]);

  const categoryData = useMemo<CategoryData[]>(() => {
    const map = new Map<string, { valor: number; quantidade: number }>();
    data.forEach((record) => {
      const entry = map.get(record.category) ?? { valor: 0, quantidade: 0 };
      map.set(record.category, {
        valor: entry.valor + record.amount,
        quantidade: entry.quantidade + 1,
      });
    });
    return Array.from(map.entries())
      .map(([name, { valor, quantidade }]) => ({
        name,
        valor: Math.round(valor),
        quantidade,
      }))
      .sort((a, b) => b.valor - a.valor);
  }, [data]);

  const statusData = useMemo<StatusData[]>(() => {
    const map = new Map<string, number>();
    data.forEach((record) => {
      map.set(record.status, (map.get(record.status) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({
      name: name as StatusData['name'],
      value,
    }));
  }, [data]);

  return { monthlyRevenue, categoryData, statusData };
}
