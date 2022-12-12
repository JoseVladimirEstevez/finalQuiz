import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Play from "./Play";
import Leaderboard from "./Leaderboard";
import SelectCategory from "./SelectCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}></Route>
      <Route path="/selectCategory" element={<SelectCategory />}></Route>
      <Route path="/play" element={<Play />}></Route>
      <Route path="/leaderboard" element={<Leaderboard />}></Route>
    </Routes>
  </BrowserRouter>
);
