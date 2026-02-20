import { memo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { MonthlyRevenue } from '../../types';

interface RevenueLineChartProps {
  data: MonthlyRevenue[];
}

function formatCurrency(value: number) {
  return `R$ ${(value / 1000).toFixed(1)}k`;
}

export const RevenueLineChart = memo(function RevenueLineChart({
  data,
}: RevenueLineChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">📈 Receita Mensal vs Meta</h3>
      {data.length === 0 ? (
        <p className="text-sm text-center py-10 text-gray-400 dark:text-gray-500">Sem dados para exibir.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--chart-text)' }} />
            <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11, fill: 'var(--chart-text)' }} />
            <Tooltip
              formatter={(value) =>
                Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
              contentStyle={{
                background: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="receita"
              name="Receita"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="meta"
              name="Meta"
              stroke="var(--chart-warning)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});
