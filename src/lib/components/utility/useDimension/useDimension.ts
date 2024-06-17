"use client";

/**
 * TODO: move this functionality to redux
 */

import { useEffect, useState } from "react";

type IMedia = "sm" | "md" | "lg" | "xl" | "2xl" | undefined;

interface IDimension {
  media: IMedia;
  width: number;
  height: number;
}

export const useDimension = () => {
  const [dimension, setDimension] = useState<IDimension>({
    width: 0,
    height: 0,
    media: undefined,
  });

  useEffect(() => {
    const handleResize = (e: UIEvent | Window) => {
      const _window: Window = e instanceof Window ? e : (e.target as Window);
      const w = _window.innerWidth;
      const h = _window.innerHeight;

      let media: IMedia;
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        media = "sm";
      } else if (w <= 640) {
        media = "sm";
      } else if (w <= 768) {
        media = "md";
      } else if (w <= 1024) {
        media = "lg";
      } else if (w <= 1280) {
        media = "xl";
      } else {
        media = "2xl";
      }

      console.log({ media, w });

      setDimension({
        width: w,
        height: h,
        media,
      });
    };

    handleResize(window);

    window.addEventListener("resize", handleResize);

    return () => document?.removeEventListener("resize", handleResize);
  }, []);

  return { dimension };
};
