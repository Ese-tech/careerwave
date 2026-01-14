// frontend/src/components/ui/ThemeSwitcher.tsx
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher() {
  const { theme, actualTheme, toggleTheme } = useTheme();

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all rounded-lg border border-gray-300 dark:border-gray-600"
      title={`Theme: ${getLabel()}`}
      aria-label={`Switch theme (current: ${getLabel()})`}
    >
      {actualTheme === 'dark' ? (
        <MoonIcon className="w-4 h-4" />
      ) : (
        <SunIcon className="w-4 h-4" />
      )}
      <span className="hidden sm:inline font-semibold">{getLabel()}</span>
    </button>
  );
}