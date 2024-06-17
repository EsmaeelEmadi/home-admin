"use client";

import classNames from "classnames";

// hooks
import { useCallback, memo } from "react";
import { useAppContext } from "@/providers/AppProvider";
import { useDimension } from "@/components/utility/useDimension/useDimension";

// helpers
import { logout } from "@/utils/axios/services/auth";
import { useRouter } from "next/navigation";

// components
import { Layout, Button, Menu, notification } from "@/ant";

// icons
import {
  LeftOutlined,
  UserOutlined,
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
  LogoutOutlined,
  PartitionOutlined,
} from "@ant-design/icons";

// types
import type { MenuProps } from "antd";
import type { ISider } from "../types";
import { AxiosError } from "axios";

interface DashboardHeaderProps extends Omit<ISider, "expand" | "collapse"> {}

// variables
const { Header } = Layout;

export const DashboardHeader = memo<DashboardHeaderProps>(
  ({ isCollapsed, toggleCollapse }) => {
    const { dimension } = useDimension();
    const [api, contextHolder] = notification.useNotification();

    const { replace } = useRouter();
    const { toggleTheme, theme } = useAppContext();

    const notif = useCallback(
      (method: "error", message: string, description: string) => {
        api[method]({
          message,
          description,
          duration: 5,
          closable: true,
          placement: "bottomLeft",
        });
      },
      [api],
    );

    const onClick: MenuProps["onClick"] = (e) => {
      if (e.key === "theme") {
        toggleTheme();
      } else if (e.key === "logout") {
        logout()
          .then(() => {
            replace("/auth/login");
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              notif("error", "Error", error.message);
            } else {
              notif("error", "Error", "Unexpected Error");
            }
          });
      }
    };

    return (
      <>
        {contextHolder}
        <Header
          className={classNames(
            "rounded-3xl h-[60px] px-2 flex place-content-between items-center",
          )}
        >
          {dimension.media !== "sm" ? (
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
          ) : (
            <Button
              type="link"
              className="m-2"
              icon={<PartitionOutlined />}
              onClick={toggleCollapse}
              shape="circle"
            />
          )}
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
                      icon:
                        theme === "dark" ? <SunOutlined /> : <MoonOutlined />,
                      key: "theme",
                    },
                  ],
                },
                {
                  label: "Profile",
                  key: "profile",
                  icon: <UserOutlined />,
                  children: [
                    {
                      label: "Logout",
                      icon: <LogoutOutlined />,
                      key: "logout",
                    },
                  ],
                },
              ]}
              triggerSubMenuAction="click"
            />
          </div>
        </Header>
      </>
    );
  },
);
