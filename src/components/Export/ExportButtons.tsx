import { memo, useState, useCallback } from 'react';
import type { SaleRecord } from '../../types';
import { exportToCSV } from '../../utils/exportCSV';
import { exportToPDF } from '../../utils/exportPDF';

interface ExportButtonsProps {
  data: SaleRecord[];
  pdfTargetId: string;
}

export const ExportButtons = memo(function ExportButtons({
  data,
  pdfTargetId,
}: ExportButtonsProps) {
  const [loadingPDF, setLoadingPDF] = useState(false);

  const handleCSV = useCallback(() => {
    exportToCSV(data, 'relatorio_vendas');
  }, [data]);

  const handlePDF = useCallback(async () => {
    setLoadingPDF(true);
    try {
      await exportToPDF(pdfTargetId, 'relatorio_vendas');
    } finally {
      setLoadingPDF(false);
    }
  }, [pdfTargetId]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Exportar:</span>
      <button
        onClick={handleCSV}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
      >
        <span>📄</span> CSV
      </button>
      <button
        onClick={() => void handlePDF()}
        disabled={loadingPDF}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loadingPDF ? (
          <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <span>📑</span>
        )}
        {loadingPDF ? 'Gerando...' : 'PDF'}
      </button>
    </div>
  );
});
