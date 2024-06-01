import { AntdRegistry } from "@ant-design/nextjs-registry";

// ── components
import { App, ConfigProvider, Flex } from "@/ant";

// ── types
import type { FC, PropsWithChildren } from "react";

// ── styles
import ANT_DEFAULT_THEME from "@/themes/ant/default";
import "./index.scss";

//          ╭─────────────────────────────────────────────────────────╮
//          │                        component                        │
//          ╰─────────────────────────────────────────────────────────╯
const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className="h-full">
      <body className="m-0 h-full">
        <AntdRegistry>
          <ConfigProvider theme={ANT_DEFAULT_THEME}>
            <App className="h-full">{children}</App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
