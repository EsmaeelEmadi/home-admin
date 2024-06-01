"use client";

// types
import type { FC } from "react";
import type { MenuProps } from "antd";
// main
import classNames from "classnames";
// hooks
import { useDashboardContext } from "@/features/dashboard/provider/Provider";
// components
import { Layout, Button, Avatar, Dropdown } from "@/ant";
// icons
import { LeftOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Item 1",
  },
  {
    key: "2",
    label: "Item 2",
  },
  {
    key: "3",
    label: "Item 3",
  },
];

export const DashboardHeader: FC = () => {
  const { isSiderCollapsed, toggleSiderCollapse } = useDashboardContext();

  return (
    <Header className="bg-white rounded-3xl h-[60px] px-2 flex place-content-between items-center">
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
      <div className="mr-2 flex gap-2">
        <Dropdown
          trigger={["click"]}
          menu={{
            items,
            selectable: false,
            defaultSelectedKeys: ["3"],
          }}
        >
          <Button type="link" shape="circle" icon={<MenuOutlined />} />
        </Dropdown>

        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};
