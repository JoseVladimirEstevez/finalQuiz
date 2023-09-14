import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Play from "./components/Play";
import Leaderboard from "./components/Leaderboard";
import SelectCategory from "./SelectCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Multiplayer from "./components/Multiplayer";
import MultiplayerChoice from "./components/MultiplayerChoice";
import JoinQuiz from "./components/player/JoinQuiz";
import MultiplayerHost from "./components/host/MultiplayerHost";
import HostQueueing from "./components/host/HostQueueing";
import WaitingRoomStudent from "./components/player/WaitingRoomStudent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}></Route>
      <Route path="/selectCategory" element={<SelectCategory />}></Route>

      <Route path="/leaderboard" element={<Leaderboard />}></Route>
      <Route path="/multiplayer" element={<Multiplayer />}>
        <Route path="choice" element={<MultiplayerChoice />} />
        <Route path="play" element={<Play />} />
        <Route path="host" element={<MultiplayerHost />} />
        <Route path="queue" element={<HostQueueing />} />
        <Route path="joinQuiz" element={<JoinQuiz />} />
        <Route path="waitingRoomStudent" element={<WaitingRoomStudent />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
