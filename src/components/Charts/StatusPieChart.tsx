import { memo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import type { StatusData } from '../../types';

interface StatusPieChartProps {
  data: StatusData[];
}

const COLORS: Record<string, string> = {
  'Concluído': 'var(--chart-success)',
  Pendente: 'var(--chart-warning)',
  Cancelado: '#ef4444',
};

export const StatusPieChart = memo(function StatusPieChart({
  data,
}: StatusPieChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">🟢 Pedidos por Status</h3>
      {data.length === 0 ? (
        <p className="text-sm text-center py-10 text-gray-400 dark:text-gray-500">Sem dados para exibir.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.name] ?? '#94a3b8'}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [Number(value), String(name)]}
              contentStyle={{
                background: 'var(--chart-tooltip-bg)',
                border: '1px solid var(--chart-tooltip-border)',
                borderRadius: '8px',
                color: 'var(--chart-tooltip-text)',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => (
                <span style={{ color: 'var(--chart-text)' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});
