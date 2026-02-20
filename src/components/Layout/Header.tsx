import { memo } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Header = memo(function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none">📊</span>
        <div>
          <h1 className="text-xl font-bold text-blue-500 leading-tight">ReportDash</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500">Sistema de Relatórios Exportáveis</p>
        </div>
      </div>
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all hover:rotate-12"
        onClick={toggleTheme}
        aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        title={`Tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
});
