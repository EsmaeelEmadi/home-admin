"use client";

import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
// utils
import { toggleHtmlTheme } from "@/utils/toggleHtmlTheme";
// types
import type { FC, PropsWithChildren } from "react";
import type { TTheme } from "@/types/app/general";

type TToggleTheme = () => void;

export interface IAppContext {
  theme: TTheme;
  toggleTheme: TToggleTheme;
}

export const AppContext = createContext<IAppContext>({
  theme: "light",
  toggleTheme: () => undefined,
});

interface AppContextProviderProps extends PropsWithChildren {}

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [isInitiated, setIsInitiated] = useState(false);
  const [theme, setTheme] = useState<TTheme>("light");

  const toggleTheme = useCallback(() => {
    if (!process.env.NEXT_PUBLIC_STORAGE_THEME) {
      throw new Error("unable to find theme storage path");
    }

    const newTheme = theme === "dark" ? "light" : "dark";
    toggleHtmlTheme(newTheme);
    localStorage.setItem(process.env.NEXT_PUBLIC_STORAGE_THEME, newTheme);
    setTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STORAGE_THEME) {
      throw new Error("unable to find theme storage path");
    }
    const storedTheme = localStorage.getItem(
      process.env.NEXT_PUBLIC_STORAGE_THEME,
    ) as TTheme | undefined;
    const newTheme = storedTheme ?? "light";
    setTheme(newTheme);
    toggleHtmlTheme(newTheme);
    setIsInitiated(true);
  }, [setTheme, setIsInitiated]);

  if (!isInitiated) return null;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
