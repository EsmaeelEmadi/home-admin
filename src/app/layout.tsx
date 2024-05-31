// ── components 
import { AntdRegistry } from "@ant-design/nextjs-registry";

// ── types
import type { FC, PropsWithChildren } from "react";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
        <html lang="en">
            <body>
                
    <div>
                    
      <AntdRegistry>
{children}
                    </AntdRegistry>
      
    </div>
            </body>
        </html>
  );
};

export default RootLayout;
