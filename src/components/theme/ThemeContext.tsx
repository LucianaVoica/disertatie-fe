import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const getInitialTheme = (): Theme => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the theme to local storage whenever it changes
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
