"use client";

import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";

// types
import type { FC, PropsWithChildren } from "react";
import type { TTheme } from "@/types/general";
import { toggleHtmlTheme } from "@/utils/toggleHtmlTheme";

type TToggleTheme = () => void;

export interface IAppContext {
  theme: TTheme;
  toggleTheme: TToggleTheme;
}

export const AppContext = createContext<IAppContext>({
  theme: "light",
  toggleTheme: () => undefined,
});

interface AppContextProviderProps extends PropsWithChildren {
  storageName: string;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
  storageName,
}) => {
  const [isInitiated, setIsInitiated] = useState(false);
  const [theme, setTheme] = useState<TTheme>("light");

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    toggleHtmlTheme(newTheme);
    localStorage.setItem(storageName, newTheme);
    setTheme(newTheme);
  }, [theme, storageName]);

  const value = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageName) as TTheme | undefined;
    const newTheme = storedTheme ?? "light";
    setTheme(newTheme);
    toggleHtmlTheme(newTheme);
    setIsInitiated(true);
  }, [setTheme, setIsInitiated, storageName]);

  if (!isInitiated) return null;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
