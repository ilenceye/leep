import { Toaster } from "@/ui/sonner.tsx";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster richColors position="bottom-center" />
  </>,
);
