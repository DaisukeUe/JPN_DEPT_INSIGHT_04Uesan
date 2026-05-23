import { Routes, Route } from "react-router";
import App from "./App";

export function Roots() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </>
  );
}
