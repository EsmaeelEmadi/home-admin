import classNames from "classnames";

// hooks
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// helpers
import { createDashboardSiderItems } from "./Items";

// components
import { Menu } from "@/ant";

// types
import type { FC } from "react";

interface IDashboardSiderMenuProps {
  className?: string;
}

export const DashboardSiderMenu: FC<IDashboardSiderMenuProps> = ({
  className,
}) => {
  const { push } = useRouter();
  const pathName = usePathname();

  const selectedKey = useMemo(() => {
    if (pathName === "/dashboard/property/list") return ["2"];
    if (pathName === "/dashboard/property/create") return ["3"];
    return ["-1"];
  }, [pathName]);

  return (
    <Menu
      className={classNames("mt-[75px] border-0", className)}
      mode="inline"
      selectedKeys={selectedKey}
      items={createDashboardSiderItems(pathName, push)}
    />
  );
};
