'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicializa de forma síncrona desde el atributo que el script bloqueante
  // (app/layout.tsx) ya dejó en <html>, así el contenido no parpadea.
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.dataset.theme === 'dark';
    }
    return false;
  });

  // Respaldo: si por algo el script no corrió, resuelve preferencia al montar.
  useEffect(() => {
    if (document.documentElement.dataset.theme) return;
    const saved = window.localStorage.getItem('buscart-theme');
    setIsDark(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  // Mantener documento y atributo sincronizados (evita flashes en overscroll y navegación)
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    document.documentElement.style.backgroundColor = isDark ? '#0a0618' : '#f0ebff';
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('buscart-theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}
