import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Tipografías servidas desde nuestro propio dominio (antes venían de Google Fonts y Fontshare,
// lo que enviaba la IP de cada visitante a esos servicios). Clash Display está en index.css.
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./index.css";
import { keepAttributionOnInternalLinks } from "./lib/attribution";

keepAttributionOnInternalLinks();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
