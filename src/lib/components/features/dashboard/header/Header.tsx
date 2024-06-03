"use client";

import classNames from "classnames";
// hooks
import { useDashboardContext } from "@/features/dashboard/provider/Provider";
import { useAppContext } from "@/providers/AppProvider";
// components
import { Layout, Button, Avatar, Menu } from "@/ant";
// icons
import {
  LeftOutlined,
  UserOutlined,
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
// types
import type { FC } from "react";
import type { MenuProps } from "antd";

// variables
const { Header } = Layout;

export const DashboardHeader: FC = () => {
  const { toggleTheme, theme } = useAppContext();

  const { isSiderCollapsed, toggleSiderCollapse } = useDashboardContext();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "theme") {
      toggleTheme();
    }
  };

  return (
    <Header
      className={classNames(
        "rounded-3xl h-[60px] px-2 flex place-content-between items-center",
      )}
    >
      <Button
        type="link"
        className="m-2"
        icon={
          <LeftOutlined
            className={classNames("transition-all", {
              "rotate-180": isSiderCollapsed,
            })}
          />
        }
        onClick={toggleSiderCollapse}
        shape="circle"
      />
      <div className="-mr-4 flex gap-2">
        <Menu
          className="w-56 bg-transparent border-none"
          selectable={false}
          onClick={onClick}
          mode="horizontal"
          items={[
            {
              label: "Settings",
              key: "SubMenu",
              icon: <MenuOutlined />,
              children: [
                {
                  label: "Theme",
                  icon: theme === "dark" ? <SunOutlined /> : <MoonOutlined />,
                  key: "theme",
                },
              ],
            },
            {
              label: "Profile",
              key: "profile",
              icon: <UserOutlined />,
            },
          ]}
          triggerSubMenuAction="click"
        />
      </div>
    </Header>
  );
};

<Avatar icon={<UserOutlined />} />;
