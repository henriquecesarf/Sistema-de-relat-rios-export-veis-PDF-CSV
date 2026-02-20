import { lazy, Suspense, memo } from 'react';
import { useFilters } from '../../hooks/useFilters';
import { useChartData } from '../../hooks/useChartData';
import { MetricCard } from '../MetricCard/MetricCard';
import { FilterBar } from '../Filters/FilterBar';
import { ExportButtons } from '../Export/ExportButtons';
import { RevenueLineChart } from '../Charts/RevenueLineChart';
import { CategoryBarChart } from '../Charts/CategoryBarChart';
import { StatusPieChart } from '../Charts/StatusPieChart';

const DataTable = lazy(() =>
  import('../Table/DataTable').then((m) => ({ default: m.DataTable })),
);

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const TableSkeleton = memo(function TableSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-2">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl" />
      ))}
    </div>
  );
});

export const Dashboard = memo(function Dashboard() {
  const {
    filters,
    setFilters,
    filteredData,
    totalRevenue,
    completedCount,
    pendingCount,
    resetFilters,
  } = useFilters();

  const { monthlyRevenue, categoryData, statusData } = useChartData(filteredData);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div
        id="dashboard-export"
        className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Visão Geral
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {filteredData.length} venda{filteredData.length !== 1 ? 's' : ''} encontrada{filteredData.length !== 1 ? 's' : ''}
            </p>
          </div>
          <ExportButtons data={filteredData} pdfTargetId="dashboard-export" />
        </div>

        <FilterBar filters={filters} onChange={setFilters} onReset={resetFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Receita Total"
            value={formatBRL(totalRevenue)}
            icon="💰"
            subtitle="Período filtrado"
            color="primary"
          />
          <MetricCard
            title="Registros"
            value={filteredData.length}
            icon="📋"
            subtitle="Total de vendas"
            color="warning"
          />
          <MetricCard
            title="Concluídos"
            value={completedCount}
            icon="✅"
            subtitle="Vendas finalizadas"
            color="success"
          />
          <MetricCard
            title="Pendentes"
            value={pendingCount}
            icon="⏳"
            subtitle="Aguardando conclusão"
            color="danger"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueLineChart data={monthlyRevenue} />
          <CategoryBarChart data={categoryData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <StatusPieChart data={statusData} />
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
              📑 Tabela de Registros
            </h3>
            <Suspense fallback={<TableSkeleton />}>
              <DataTable data={filteredData} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
});
