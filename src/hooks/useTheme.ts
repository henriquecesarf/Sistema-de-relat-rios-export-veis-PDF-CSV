import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve estar dentro de ThemeProvider');
  return ctx;
}
