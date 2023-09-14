import React from 'react';
import { Link } from 'react-router-dom';

function WaitingRoomStudent() {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      
      <div className="container m-5 text-center">
        <div className="row m-5">
          <h1 className='text-center display-1'>Kahoot!</h1>
        </div>
        <div className="row m-4">
          <div className="col">
            <h1 className='text-center display-3'>Welcome Vlad</h1>
          </div>
        </div>
        <div className="row m-4">
          <div className="col">
            <h1 className='text-center display-3'>Waiting for host to start the game.</h1>
          </div>
        </div>
      </div>
      <div className="col d-md-flex justify-content-md-end">
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to="/multiplayer/joinQuiz"
        >
          <button
            type="button"
            className="px-5 p-3 m-3 btn btn-lg btn-secondary rounded-pill"
          >
            Go Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WaitingRoomStudent;
