// hooks
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// helpers
import { createDashboardSiderItems } from "./Items";

// components
import { Menu } from "@/ant";

// types
import type { FC } from "react";

export const DashboardSiderMenu: FC = () => {
  const { push } = useRouter();
  const pathName = usePathname();

  const selectedKey = useMemo(() => {
    if (pathName === "/dashboard/property/list") return ["2"];
    if (pathName === "/dashboard/property/create") return ["3"];
    return ["-1"];
  }, [pathName]);

  return (
    <Menu
      className="mt-[75px] border-0"
      mode="inline"
      selectedKeys={selectedKey}
      items={createDashboardSiderItems(pathName, push)}
    />
  );
};
