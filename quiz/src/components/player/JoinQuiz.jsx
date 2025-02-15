import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {SocketContext} from "../../data/socketContext";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";

function JoinQuiz() {
  const socket = useContext(SocketContext);
  const [playerName, setPlayerName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) {
      navigate("/multiplayer");
    }

    // Setup socket event listeners
    socket.on("displayName", (data) => {
      localStorage.setItem("name", data.name);
      navigate("/multiplayer/waitingRoomStudent");
    });

    socket.on("errorMessage", () => {
      alert("The room code is not valid");
    });

    // Cleanup listeners when component unmounts
    return () => {
      socket.off("displayName");
      socket.off("errorMessage");
    };
  }, [socket, navigate]);

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };
  
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const verifyRoomCode = () => {
    // Input validation
    if (!playerName.trim() || !code.trim()) {
      alert("Please enter both name and room code");
      return;
    }

    const nameCode = { 
      name: playerName.trim(),
      code: code.trim()
    };

    //console.log("Attempting to join room with code:", nameCode.code); // Debug log
    socket.emit("nameCode", nameCode);
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column p-5 text-center justify-content-center align-items-center"
    >
      <div className="container m-5">
        <div className="row m-5">
          <h1 className="text-center display-1">Kahoot!</h1>
        </div>
        <div className="row m-4">
          <div className="col">
            <input
              className="bg-light rounded-2 border-0 p-2"
              type="text"
              placeholder="Room code"
              value= {code} // Set input value to the playerName state
              onChange={handleCodeChange} // Call handleInputChange on input change
            />
          </div>
        </div>
        <div className="row m-4">
          <div className="col">
            <input
              className="bg-light rounded-2 border-0 p-2"
              type="text"
              placeholder="Username"
              value={playerName} // Set input value to the playerName state
              onChange={handleNameChange} // Call handleInputChange on input change
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="m-2">
            <div
              style={{ color: "inherit", textDecoration: "none" }}
              to="/multiplayer/waitingRoomStudent"
            >
              <button
                type="submit"
                className="px-2 py-1 btn btn-lg btn-secondary rounded-pill"
                onClick={()=>verifyRoomCode()}
              >
                Join Room
              </button>
            </div>
          </div>
          <div className="m-2">
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/multiplayer/choice"
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
    </div>
  );
}

export default JoinQuiz;
