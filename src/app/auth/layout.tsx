// types
import type { FC, PropsWithChildren } from "react";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
