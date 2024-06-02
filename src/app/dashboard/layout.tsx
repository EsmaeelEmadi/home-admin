"use client";

// components
import { Layout, Flex } from "@/ant";
import { DashboardHeader } from "@/features/dashboard/header/Header";
import { DashboardSider } from "@/features/dashboard/sider/Sider";
import { DashboardBreadcramb } from "@/features/dashboard/breadcrumb/Breadcrumb";
//  providers
import { DashboardContextProvider } from "@/features/dashboard/provider/Provider";
// types
import type { FC, PropsWithChildren } from "react";

// variables
const { Content } = Layout;

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DashboardContextProvider>
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
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
