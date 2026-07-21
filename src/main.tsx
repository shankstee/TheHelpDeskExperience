import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppThemeProvider } from "./theme";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
