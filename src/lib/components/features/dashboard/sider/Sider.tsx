"use client";

import classNames from "classnames";

// hooks
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// components
import { Layout, Menu } from "@/ant";
import Link from "next/link";

// icons
import {
  HomeOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { LogoTypeSvg, LogoSvg } from "@/svgs";

// types
import type { FC } from "react";
import type { ISider } from "../types";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { MenuProps } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";

interface DashboardSiderProps extends Omit<ISider, "toggleCollapse"> {}
type TPush = (href: string, options?: NavigateOptions) => void;

interface MItem extends MenuItemType {
  children: Required<MenuProps>["items"][number][];
}

// variables
const { Sider } = Layout;

const createItems = (pathName: string, push: TPush): Array<MItem> => {
  return [
    {
      label: "Property",
      type: "item",
      icon: <HomeOutlined />,
      key: "1",
      children: [
        {
          label: "List",
          type: "item",
          key: "2",
          icon: <UnorderedListOutlined />,
          onClick: () => {
            const path = "/dashboard/property/list";
            if (!pathName.startsWith(path)) {
              push(path);
            }
          },
        },
        {
          label: "Create",
          type: "item",
          key: "3",
          icon: <PlusOutlined />,
          onClick: () => push("/dashboard/property/create"),
        },
      ],
    },
  ];
};

export const DashboardSider: FC<DashboardSiderProps> = ({ isCollapsed }) => {
  const { push } = useRouter();
  const pathName = usePathname();

  const selectedKey = useMemo(() => {
    if (pathName === "/dashboard/property/list") return ["2"];
    if (pathName === "/dashboard/property/create") return ["3"];
    return ["-1"];
  }, [pathName]);

  return (
    <Sider
      collapsed={isCollapsed}
      theme="light"
      className="rounded-3xl"
      collapsedWidth={60}
    >
      <div className="flex flex-col h-full">
        <div className="flex p-4 justify-center pt-6">
          <Link href="/dashboard">
            <LogoSvg
              className={classNames(
                "fill-blue-600 transition-all duration-200 ease-in h-fit w-[22px]",
                {
                  hidden: !isCollapsed,
                },
              )}
            />
            <LogoTypeSvg
              className={classNames(
                "fill-blue-600 transition-all duration-200 ease-in h-fit w-[110px]",
                {
                  hidden: isCollapsed,
                },
              )}
            />
          </Link>
        </div>

        <Menu
          className="mt-[75px] border-0"
          mode="inline"
          selectedKeys={selectedKey}
          items={createItems(pathName, push)}
        />
      </div>
    </Sider>
  );
};
