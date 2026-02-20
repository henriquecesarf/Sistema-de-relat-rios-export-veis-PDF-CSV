import { memo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import type { CategoryData } from '../../types';

interface CategoryBarChartProps {
  data: CategoryData[];
}

const COLORS = [
  'var(--chart-primary)',
  'var(--chart-success)',
  'var(--chart-warning)',
  'var(--chart-purple)',
  'var(--chart-pink)',
];

export const CategoryBarChart = memo(function CategoryBarChart({
  data,
}: CategoryBarChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">🏷️ Vendas por Categoria</h3>
      {data.length === 0 ? (
        <p className="text-sm text-center py-10 text-gray-400 dark:text-gray-500">Sem dados para exibir.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--chart-text)' }} />
            <YAxis
              tickFormatter={(v: number) => `R$ ${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: 'var(--chart-text)' }}
            />
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
              contentStyle={{
                background: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
            />
            <Bar dataKey="valor" name="Total (R$)" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});
