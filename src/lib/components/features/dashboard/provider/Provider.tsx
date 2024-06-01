"use client";

import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
// ── types
import type { FC, PropsWithChildren } from "react";

export interface IDashboardContext {
  isSiderCollapsed: boolean;
  toggleSiderCollapse: () => void;
}

export const DashboardContext = createContext<IDashboardContext>({
  isSiderCollapsed: false,
  toggleSiderCollapse: () => undefined,
});

export const DashboardContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);

  const toggleSiderCollapse = useCallback(() => {
    setIsSiderCollapsed((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return {
      isSiderCollapsed,
      toggleSiderCollapse,
    };
  }, [isSiderCollapsed, toggleSiderCollapse]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
