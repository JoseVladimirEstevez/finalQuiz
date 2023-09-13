import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Play from "./Play";
import Leaderboard from "./Leaderboard";
import SelectCategory from "./SelectCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Multiplayer from "./Multiplayer";
import MultiplayerChoice from "./MultiplayerChoice";
import JoinQuiz from "./JoinQuiz";
import MultiplayerHost from "./MultiplayerHost";
import HostQueueing from "./HostQueueing";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}></Route>
      <Route path="selectCategory" element={<SelectCategory />}></Route>

      <Route path="leaderboard" element={<Leaderboard />}></Route>
      <Route path="multiplayer" element={<Multiplayer />}>
        <Route path="choice" element={<MultiplayerChoice />} />
        <Route path="play" element={<Play />} />
        <Route path="queue" element={<HostQueueing />} />
        <Route path="host" element={<MultiplayerHost />}/>
      </Route>
      <Route path="joinQuiz" element={<JoinQuiz />} />
    </Routes>
  </BrowserRouter>
);
