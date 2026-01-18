'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <i className={`fas fa-sun theme-icon sun-icon ${theme === 'light' ? 'active' : ''}`}></i>
      <i className={`fas fa-moon theme-icon moon-icon ${theme === 'dark' ? 'active' : ''}`}></i>
    </button>
  );
}
