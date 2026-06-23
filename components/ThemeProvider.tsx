"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark since it is the default visual theme on the server
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Only run on the client
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        // Fallback to system preference detection
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const systemTheme = prefersDark ? "dark" : "light";
        setThemeState(systemTheme);
        document.documentElement.setAttribute("data-theme", systemTheme);
      }
    } catch (e) {
      console.warn("ThemeProvider: Failed to load theme from localStorage", e);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } catch (e) {
      console.warn("ThemeProvider: Failed to save theme to localStorage", e);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
