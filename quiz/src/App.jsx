import React, { useContext, useEffect, useState } from "react";

function HostQueueing() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex p-5 text-center justify-content-center align-items-center"
    >
      <div>
        <h1 className="m-5">You are queueing a Quiz</h1>
        <h2  className="m-5">Room number: 123</h2>
        <h3  className="m-5">Number of players = 123</h3>
        <button type="button" className="px-5 p-3 btn btn-lg btn-secondary rounded-pill">
          START
        </button>
      </div>
    </div>
  );
}

export default HostQueueing;
