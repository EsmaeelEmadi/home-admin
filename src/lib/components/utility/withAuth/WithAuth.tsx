"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
// types
import type { FC, PropsWithChildren } from "react";

export const WithAuth: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(true);
  const { replace } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    (async () => {
      const _isAuth = await isAuthenticated();
      setIsAuth(_isAuth);
    })();
  }, [pathName]);

  useEffect(() => {
    if (isAuth === false) replace("/auth/login");
  }, [isAuth, replace]);

  if (isAuth === undefined) return <p>wait</p>;
  return children;
};
