"use client";

// hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// helpers
import { isAuthenticated } from "@/utils/auth";

// components
import { Spin } from "@/ant";

// icons
import { LoadingOutlined } from "@ant-design/icons";

// types
import type { FC, PropsWithChildren } from "react";

export const WithAuth: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
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

  if (isAuth === true) return children;
  return (
    <div className="flex justify-center items-center h-full">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};
