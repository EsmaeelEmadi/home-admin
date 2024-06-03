"use client";

//  providers
import { DashboardContextProvider } from "@/features/dashboard/provider/Provider";
//  hooks
import { useState, useCallback } from "react";
import { useAppContext } from "@/providers/AppProvider";
// components
import { Layout, Flex, ConfigProvider } from "@/ant";
import { DashboardHeader } from "@/features/dashboard/header/Header";
import { DashboardSider } from "@/features/dashboard/sider/Sider";
import { DashboardBreadcramb } from "@/features/dashboard/breadcrumb/Breadcrumb";
// constants
import { DARK_THEME, LIGHT_THEME } from "@/themes/ant/default";
// types
import type { FC, PropsWithChildren } from "react";

// variables
const { Content } = Layout;

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme: appTheme } = useAppContext();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <DashboardContextProvider>
      <ConfigProvider theme={appTheme === "dark" ? DARK_THEME : LIGHT_THEME}>
        <Layout className="h-full">
          <Flex className="w-full h-full p-4 flex gap-4">
            <DashboardSider isCollapsed={isCollapsed} />
            <Layout className="h-full flex gap-4">
              <DashboardHeader
                isCollapsed={isCollapsed}
                toggleCollapse={toggleCollapse}
              />
              <DashboardBreadcramb />
              <Content>{children}</Content>
            </Layout>
          </Flex>
        </Layout>
      </ConfigProvider>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
