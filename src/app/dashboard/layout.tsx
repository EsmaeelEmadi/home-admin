"use client";

// components
import { Layout, Flex, theme, ConfigProvider } from "@/ant";
import { DashboardHeader } from "@/features/dashboard/header/Header";
import { DashboardSider } from "@/features/dashboard/sider/Sider";
import { DashboardBreadcramb } from "@/features/dashboard/breadcrumb/Breadcrumb";
//  providers
import { DashboardContextProvider } from "@/features/dashboard/provider/Provider";
// constants
import { DARK_THEME, LIGHT_THEME } from "@/themes/ant/default";
// types
import type { FC, PropsWithChildren } from "react";
import { useAppContext } from "@/providers/AppProvider";

// variables
const { Content } = Layout;

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme: appTheme } = useAppContext();

  return (
    <DashboardContextProvider>
      <ConfigProvider theme={appTheme === "dark" ? DARK_THEME : LIGHT_THEME}>
        <Layout className="h-full">
          <Flex className="w-full h-full p-4 flex gap-4">
            <DashboardSider />
            <Layout className="h-full flex gap-4">
              <DashboardHeader />
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
