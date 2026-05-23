import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Roots } from "./Roots.tsx";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <Roots />
      </Router>
    </StrictMode>
  </Provider>,
);
