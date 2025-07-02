import React from "react";
import ReactDOM from "react-dom/client";

// Import self-hosted fonts
// Cairo Play for body text (weights 400, 500, 600, 700)
import "@fontsource/cairo-play/400.css";
import "@fontsource/cairo-play/500.css";
import "@fontsource/cairo-play/600.css";
import "@fontsource/cairo-play/700.css";
// Anta for headings (weight 400)
import "@fontsource/anta/400.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
