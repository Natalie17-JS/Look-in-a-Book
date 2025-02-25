"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Тип для темы
type Theme = "light" | "dark" | "gray";

// Тип для контекста
interface ThemeContextType {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

// Создаем контекст с начальным значением `undefined`
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Хук для использования контекста
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// Тип для свойств провайдера
interface ThemeProviderProps {
  children: ReactNode;
}

// Создаем провайдер контекста
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark"); // Начальная тема — 'light'

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
