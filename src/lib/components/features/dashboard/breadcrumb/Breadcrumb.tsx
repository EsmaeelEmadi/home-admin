"use client";

import { usePathname } from "next/navigation";

import { Breadcrumb } from "@/ant";

import { useCallback, type FC } from "react";
import Link from "next/link";

export const DashboardBreadcramb: FC = () => {
  const pathname = usePathname();

  const getRoutes = useCallback(() => {
    const paths = pathname.split("/");
    let path = "";

    const items = [];

    for (const currentPath of paths) {
      if (currentPath.length) {
        path += `/${currentPath}`;
        items.push({ title: <Link href={path}>{currentPath}</Link> });
      }
    }

    return items;
  }, [pathname]);

  return (
    <div>
      <Breadcrumb items={getRoutes()} />
    </div>
  );
};
