"use client";

//  hooks
import { useState, useCallback } from "react";
import { useAppContext } from "@/providers/AppProvider";
// components
import { Layout, Flex, ConfigProvider } from "@/ant";
import { DashboardHeader } from "@/features/dashboard/header/Header";
import { DashboardSider } from "@/features/dashboard/sider/Sider";
// import { DashboardBreadcramb } from "@/features/dashboard/breadcrumb/Breadcrumb";
// constants
import { DARK_THEME, LIGHT_THEME } from "@/themes/ant/default";
// types
import type { FC, PropsWithChildren } from "react";
import { WithAuth } from "@/components/utility/withAuth/WithAuth";

// variables
const { Content } = Layout;

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme: appTheme } = useAppContext();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  return (
    <WithAuth>
      <ConfigProvider theme={appTheme === "dark" ? DARK_THEME : LIGHT_THEME}>
        <Layout className="h-full dark:bg-[121212]">
          <Flex className="w-full h-full p-4 flex gap-4">
            <DashboardSider
              isCollapsed={isCollapsed}
              collapse={collapse}
              toggleCollapse={toggleCollapse}
            />
            <Layout className="h-full flex gap-4">
              {/* <DashboardBreadcramb /> */}
              <Content className="h-full flex flex-col gap-4">
                <DashboardHeader
                  isCollapsed={isCollapsed}
                  toggleCollapse={toggleCollapse}
                />

                {children}
              </Content>
            </Layout>
          </Flex>
        </Layout>
      </ConfigProvider>
    </WithAuth>
  );
};

export default DashboardLayout;
