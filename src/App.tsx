import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col flex-1 w-full min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <Header />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}
