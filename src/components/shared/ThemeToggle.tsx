'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder for layout shift prevention
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg border border-border bg-card text-card-foreground hover:bg-muted transition-all shadow-sm flex items-center justify-center"
      aria-label="Toggle Theme"
      title="Toggle Dark Mode"
    >
      {currentTheme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
