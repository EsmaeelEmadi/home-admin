"use client";

// components
import { ConfigProvider, Menu } from "@/ant";
// hooks
import { useAppContext } from "@/providers/AppProvider";
// constants
import { DARK_THEME, LIGHT_THEME } from "@/themes/ant/default";
// icons
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { LogoTypeSvg } from "@/svgs";
// types
import type { FC, PropsWithChildren } from "react";
import type { MenuProps } from "antd";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme: appTheme, toggleTheme } = useAppContext();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "theme") {
      toggleTheme();
    }
  };

  return (
    <ConfigProvider theme={appTheme === "dark" ? DARK_THEME : LIGHT_THEME}>
      <div className="absolute top-4 right-0 left-0 flex place-content-between items-center px-8">
        <LogoTypeSvg className="w-36 fill-blue-600 h-fit" />
        <Menu
          className="bg-transparent border-none"
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
                    appTheme === "dark" ? <SunOutlined /> : <MoonOutlined />,
                  key: "theme",
                },
              ],
            },
          ]}
          triggerSubMenuAction="click"
        />
      </div>

      <div className="h-full w-full bg-gray-50/20 dark:bg-dark/95 flex justify-center items-center">
        {children}
      </div>
    </ConfigProvider>
  );
};

export default AuthLayout;
