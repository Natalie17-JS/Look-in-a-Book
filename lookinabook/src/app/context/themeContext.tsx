import { useState, useContext, createContext, ReactNode } from "react";

// Тип для темы
type Theme = "light" | "dark" | "gray";

interface ThemeContextType {
  theme: Theme; // Используем тип "light" | "dark" | "gray"
  setTheme: React.Dispatch<React.SetStateAction<Theme>>; // Типизируем setTheme
  toggleTheme: (theme: string) => void; // Функция для переключения темы
}

const themeContext = createContext<ThemeContextType | undefined>(undefined);

// Хук для использования контекста
export const useTheme = () => {
  const thcontext = useContext(themeContext);
  if (!thcontext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return thcontext;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Провайдер для контекста
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light"); // Начальная тема - светлая

  // Функция для переключения темы
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("gray");
    } else {
      setTheme("light");
    }
  };

  return (
    <themeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};
