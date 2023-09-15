import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../data/socketContext";

function HostQueueing() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");

  useEffect(() => {
    if (socket) {
      socket.emit("hosting", { host: "Started" });

      socket.on("newRoom", (data) => {
        setCode(data);
        //console.log("123")
      });

      socket.on("amountOfPlayers", (data) => {
        console.log(data)
        setNumberOfPlayers(data);
        
        console.log('numberOfPlayers: ', numberOfPlayers);
      })
    } else {
      navigate("/multiplayer");
      console.log("No socket found");
    }
  }, []);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column p-5 text-center justify-content-center align-items-center"
    >
      <h1 className="m-3">You are queueing a Quiz</h1>
      <h2 className="m-2">Room number: {code}</h2>
      <h3 className="m-1">Number of players = {numberOfPlayers}</h3>
      <div className="d-flex justify-content-center">
        <div className="m-2">
          <Link
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            to={`/multiplayer/play`}
          >
            <button
              type="button"
              className="px-2 py-1 btn btn-lg btn-secondary rounded-pill"
            >
              Start the Quiz
            </button>
          </Link>
        </div>
        <div className="m-2">
          <Link
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            to="/multiplayer/host"
          >
            <button
              type="button"
              className="px-2 py-1 btn btn-lg btn-secondary rounded-pill"
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HostQueueing;
