"use client";

import classNames from "classnames";
// hooks
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
import type { ISider } from "../types";

// variables
const { Header } = Layout;

interface DashboardHeaderProps extends ISider {}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  isCollapsed,
  toggleCollapse,
}) => {
  const { toggleTheme, theme } = useAppContext();

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
              "rotate-180": isCollapsed,
            })}
          />
        }
        onClick={toggleCollapse}
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
