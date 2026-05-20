const theme = localStorage.getItem("theme") || "dark";
if (theme === "dark") {
  document.documentElement.classList.add("dark");
}
