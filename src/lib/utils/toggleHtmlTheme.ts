export const toggleHtmlTheme = () => {
  const htmlTag = document.getElementsByName("html")[0];
  if (!htmlTag) {
    throw new Error("no html tag could be found in the document!");
  }

  htmlTag.classList.toggle("dark");
};
