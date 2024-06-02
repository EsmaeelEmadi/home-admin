"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
// components
import { Breadcrumb } from "@/ant";
import Link from "next/link";
// types
import type { FC } from "react";

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
