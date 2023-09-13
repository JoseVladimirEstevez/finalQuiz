import React from "react";
import { Link } from "react-router-dom";

function HostQueueing() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column p-5 text-center justify-content-center align-items-center"
    >
      <h1 className="m-3">You are queueing a Quiz</h1>
      <h2  className="m-2">Room number: 123</h2>
      <h3  className="m-1">Number of players = 123</h3>
      <div className="d-flex justify-content-center">
        <div className="m-2">
          <Link
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            to={`/multiplayer/queue`}
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
            to="/multiplayer"
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
