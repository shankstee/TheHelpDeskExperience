import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";

const THEME_KEY = "hde.theme";

interface ThemeContextValue {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ dark: false, toggle: () => {} });

export const useAppTheme = () => useContext(ThemeContext);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      <FluentProvider theme={dark ? webDarkTheme : webLightTheme}>
        {children}
      </FluentProvider>
    </ThemeContext.Provider>
  );
}
