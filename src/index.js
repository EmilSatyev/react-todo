import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";
import { AppProvider } from "./context/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
