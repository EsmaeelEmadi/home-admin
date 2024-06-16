"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";
import { redirect, usePathname } from "next/navigation";
// types
import type { FC, PropsWithChildren } from "react";

export const WithAuth: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(true);
  const pathName = usePathname();

  useEffect(() => {
    (async () => {
      const _isAuth = await isAuthenticated();
      setIsAuth(_isAuth);
    })();
  }, [pathName]);

  if (isAuth === undefined) return <p>wait</p>;
  if (!isAuth) redirect("/auth/login");
  return children;
};
