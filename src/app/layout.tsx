"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StrictMode } from "react";
// components
import { App } from "@/ant";
// styles
// import ANT_DEFAULT_THEME from "@/themes/ant/default";
import "./index.css";
// types
import type { FC, PropsWithChildren } from "react";
import { AppContextProvider } from "@/components/utility/providers/AppProvider";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <AntdRegistry>
        <html lang="en" className="h-full">
          <body className="m-0 h-full">
            <AppContextProvider>
              <App className="h-full">{children}</App>
            </AppContextProvider>
          </body>
        </html>
      </AntdRegistry>
    </StrictMode>
  );
};

export default RootLayout;
