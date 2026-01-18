'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/utils';

const THEME_KEY = 'solaris-theme';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Get initial theme
  useEffect(() => {
    setMounted(true);
    const getSavedTheme = (): Theme => {
      const saved = storage.get<string>(THEME_KEY, '');
      if (saved) return saved as Theme;

      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      return 'dark';
    };

    const initialTheme = getSavedTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    storage.set(THEME_KEY, newTheme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!storage.get<string>(THEME_KEY, '')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { theme, toggleTheme, mounted };
}
