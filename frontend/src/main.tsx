import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 1. Import this
import App from "./App";
import "./index.css";

// 2. Wrap <App /> with <BrowserRouter>
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);