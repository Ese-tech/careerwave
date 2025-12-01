// frontend/src/components/ui/ThemeSwitcher.tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, actualTheme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'system') return '🖥️';
    return actualTheme === 'dark' ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      title={`Current theme: ${getLabel()}`}
    >
      <span className="text-lg">{getIcon()}</span>
      <span className="hidden md:inline">{getLabel()}</span>
    </button>
  );
}