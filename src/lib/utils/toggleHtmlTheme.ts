// types
import { TTheme } from "@/types/app/general";

export const toggleHtmlTheme = (theme: TTheme) => {
  const htmlTag = document.getElementsByTagName("html")[0];
  if (!htmlTag) {
    throw new Error("no html tag could be found in the document!");
  }

  if (theme === "dark") {
    htmlTag.classList.add("dark");
  } else {
    htmlTag.classList.remove("dark");
  }
};
