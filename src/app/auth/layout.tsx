// ── types
import type {FC, PropsWithChildren} from "react";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
const AuthLayout : FC<PropsWithChildren> = ({children}) => { 
  return <>{children}</ >
}

export default AuthLayout;
