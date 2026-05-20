import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply dark mode on startup to prevent flash
const theme = localStorage.getItem("theme") || "dark";
if (theme === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
