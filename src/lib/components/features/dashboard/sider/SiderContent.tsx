// helpers
import classNames from "classnames";

// components
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardSiderMenu } from "./SiderMenu";

// icons
import { LogoTypeSvg, LogoSvg } from "@/svgs";

// types
import type { FC } from "react";

interface IDashboardSiderContentProps {
  isCollapsed: boolean;
}

export const DashboardSiderContent: FC<IDashboardSiderContentProps> = ({
  isCollapsed,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex p-4 justify-center pt-6">
        <Link href="/dashboard">
          {isCollapsed ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ easing: "easeIn", duration: 1 }}
            >
              <LogoSvg
                className={classNames("fill-blue-600 h-fit w-[22px]", {
                  hidden: !isCollapsed,
                })}
              />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ easing: "easeIn", duration: 1 }}
            >
              <LogoTypeSvg
                className={classNames("fill-blue-600 h-fit w-[110px]")}
              />
            </motion.div>
          )}
        </Link>
      </div>

      <DashboardSiderMenu />
    </div>
  );
};
