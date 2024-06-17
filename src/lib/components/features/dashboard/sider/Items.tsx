// icons
import {
  HomeOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// types
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { MenuProps } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";

type TPush = (href: string, options?: NavigateOptions) => void;

interface MItem extends MenuItemType {
  children: Required<MenuProps>["items"][number][];
}
export const createDashboardSiderItems = (
  pathName: string,
  push: TPush,
): Array<MItem> => {
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
