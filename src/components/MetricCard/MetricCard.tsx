import { memo } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

const borderMap = {
  primary: 'border-l-blue-500',
  success: 'border-l-green-500',
  warning: 'border-l-amber-500',
  danger: 'border-l-red-500',
};

export const MetricCard = memo(function MetricCard({
  title,
  value,
  icon,
  subtitle,
  color = 'primary',
}: MetricCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-l-4 ${borderMap[color]} rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {title}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
      )}
    </div>
  );
});
