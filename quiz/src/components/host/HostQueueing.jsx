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
  const [quizData, setQuizData] = useState(null); // Add this line

  async function clickPlay() {
    socket.emit("sendQuiz");
   

    // Use a Promise to wait for the "hostJoin" event to be acknowledged by the server
    const hostJoinAck = new Promise((resolve) => {
      socket.on("hostJoinAck", () => {
        resolve();
      });
    });

    await hostJoinAck; // Wait for the "hostJoin" event acknowledgment
  }

  useEffect(() => {
    if (socket) {
      socket.emit("hosting", { host: "Started" });
      socket.emit("hostJoin");
      socket.on("newRoom", (data) => {
        setCode(data);
      });

      socket.on("amountOfPlayers", (data) => {
        setNumberOfPlayers(data);
      });

      socket.on("getQuiz", (data) => {
        localStorage.setItem("time", JSON.stringify(data.timePerQuestion));
        localStorage.setItem("quizInfo", JSON.stringify(data));
        setQuizData(data); // Store the quiz data in state
      });
    } else {
      navigate("/multiplayer");
    }
  }, [socket]);

  useEffect(() => {
    if (quizData) {
      navigate("/multiplayer/play"); // Navigate to the play component when quizData is available
    }
  }, [quizData]);

  



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
          
            <button
              type="button"
              className="px-2 py-1 btn btn-lg btn-secondary rounded-pill"
              onClick={()=>clickPlay()}
            >
              Start the Quiz
            </button>
        
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
