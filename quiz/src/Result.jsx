import React from "react";
import { Link } from "react-router-dom";

function result() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex p-5 text-center  justify-content-center align-items-center "
    >
      <div>
        <h1 className="p-4">Completed!</h1>
        <h3 className="m-4 pb-5">Your score is X / 10</h3>
        <div className="container">
          <div className="row align-items-center">
            <div className="col justify-content-end d-flex">
              <h3>Name</h3>
            </div>
            <div className="col">
              <input type="text" id="Username" />
            </div>
            <div className="col">
              <Link to="../leaderboard">
                <button type="button" className="btn btn-lg btn-secondary">
                  Save score to Leaderboard{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Link to="../selectCategory">
          <button
            type="button"
            className="px-5 py-3 mt-5 btn btn-lg btn-secondary"
          >
            Replay
          </button>
        </Link>
      </div>
    </div>
  );
}

export default result;
