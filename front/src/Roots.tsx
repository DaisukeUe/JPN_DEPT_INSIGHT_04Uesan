import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

export function Roots() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<App />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
