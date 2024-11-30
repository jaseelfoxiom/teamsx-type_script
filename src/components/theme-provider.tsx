import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the theme options type
type Theme = "system" | "light" | "dark";

// Define the context value type
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Define the ThemeProvider props type
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Initial context state
const initialState: ThemeContextType = {
  theme: "system",
  setTheme: () => null,
};

// Create the context with the initial state
const ThemeProviderContext = createContext<ThemeContextType>(initialState);

// ThemeProvider component
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem(storageKey) as Theme || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
