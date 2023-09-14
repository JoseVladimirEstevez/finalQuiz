import React, { useState } from "react";
import { Link } from "react-router-dom";

function JoinQuiz() {
  const [playerName, setPlayerName] = useState(""); // Define the playerName state
  const [code, setCode] = useState("")

  const handleNameChange = (e) => {
    setPlayerName(e.target.value); // Update the playerName state when input changes
  };
  
  const handleCodeChange = (e) => {
    setCode(e.target.value); // Update the playerName state when input changes
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
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/multiplayer/waitingRoomStudent"
            >
              <button
                type="submit"
                className="px-2 py-1 btn btn-lg btn-secondary rounded-pill"
              >
                Join Room
              </button>
            </Link>
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
