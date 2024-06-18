"use client";

// hooks
import { useDimension } from "@/components/utility/useDimension/useDimension";

// components
import { Divider, Drawer, Layout, Button } from "@/ant";
import { DashboardSiderContent } from "./SiderContent";
import { DashboardSiderMenu } from "./SiderMenu";

// icons
import { CloseOutlined } from "@ant-design/icons";

// types
import { useEffect, type FC } from "react";
import type { ISider } from "../types";
import { LogoTypeSvg } from "@/svgs";

interface DashboardSiderProps extends Omit<ISider, "expand"> {}

// variables
const { Sider } = Layout;

export const DashboardSider: FC<DashboardSiderProps> = ({
  isCollapsed,
  toggleCollapse,
  collapse,
}) => {
  const { dimension } = useDimension();

  useEffect(() => {
    if (dimension.media === "sm") {
      collapse();
    }
  }, [dimension.media, collapse]);

  if (dimension.media === "sm") {
    return (
      <Drawer
        closeIcon={null}
        placement="left"
        open={isCollapsed}
        onClose={toggleCollapse}
      >
        <div className="flex flex-col items-center relative">
          <LogoTypeSvg className="fill-blue-600 h-fit w-[110px]" />
          <Button
            onClick={collapse}
            type="text"
            shape="circle"
            className="absolute right-0 -top-2"
            icon={<CloseOutlined width={20} height={20} />}
          />
        </div>
        <Divider />
        <DashboardSiderMenu className="mt-0" />
      </Drawer>
    );
  }

  return (
    <Sider
      key="dashboard-sider"
      collapsed={isCollapsed}
      theme="light"
      className="rounded-3xl"
      collapsedWidth={60}
    >
      <DashboardSiderContent isCollapsed={isCollapsed} />
    </Sider>
  );
};
