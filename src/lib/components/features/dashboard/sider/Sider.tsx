"use client";

// types
import type { FC } from "react";
// main
import classNames from "classnames";
// components
import { Layout, Menu } from "@/ant";
// icons
import { MessageOutlined } from "@ant-design/icons";
import { LogoTypeSvg, LogoSvg } from "src/lib/components/svgs";
// hooks
import { useDashboardContext } from "@/features/dashboard/provider/Provider";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯

const { Sider } = Layout;

export const DashboardSider: FC = () => {
  const { isSiderCollapsed } = useDashboardContext();

  return (
    <Sider
      collapsed={isSiderCollapsed}
      theme="light"
      className="rounded-3xl"
      collapsedWidth={60}
    >
      <div className="flex flex-col h-full">
        <div className="flex p-4 justify-center pt-6">
          <LogoSvg
            className={classNames(
              "fill-blue-600 transition-all duration-200 ease-in h-fit w-[22px]",
              {
                hidden: !isSiderCollapsed,
              },
            )}
          />
          <LogoTypeSvg
            className={classNames(
              "fill-blue-600 transition-all duration-200 ease-in h-fit w-[110px]",
              {
                hidden: isSiderCollapsed,
              },
            )}
          />
        </div>

        <Menu
          className="mt-[75px] border-0"
          mode="inline"
          items={[
            {
              label: "Property",
              type: "item",
              icon: <MessageOutlined />,
              key: "1",
              children: [
                {
                  label: "List",
                  type: "item",
                  key: "2",
                },
                {
                  label: "Create",
                  type: "item",
                  key: "3",
                },
              ],
            },
          ]}
        />
      </div>
    </Sider>
  );
};
