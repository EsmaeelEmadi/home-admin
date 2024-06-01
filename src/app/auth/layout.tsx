// types
import type { FC, PropsWithChildren } from "react";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full w-full bg-gray-50/20 flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
