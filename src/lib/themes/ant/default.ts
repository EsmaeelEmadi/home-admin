"use client";

import { theme } from "@/ant";
// types
import type { ThemeConfig } from "antd";

export const DARK_THEME: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  components: {
    Layout: {
      colorBgHeader: "#141414",
      colorBgBody: "#121212",
    },
  },
} as const;

export const LIGHT_THEME: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  components: {
    Layout: {
      colorBgHeader: "#ffffff",
    },
  },
} as const;
