import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Context from "./services/Context.jsx";
import { BrowserRouter } from "react-router-dom/dist/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
);
