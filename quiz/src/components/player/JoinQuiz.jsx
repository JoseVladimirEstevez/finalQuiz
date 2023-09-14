import React from 'react'
import { Link } from 'react-router-dom'

function JoinQuiz() {
  return (
    <div>
      <div className="container m-5 text-center">
        <div className="row m-5">
          <h1 className='text-center display-1'>Kahoot!</h1>
        </div>
        <div className="row m-4">
          <div className="col">
            <input className='bg-light rounded-2 border-0 p-2' type="text" placeholder="Room code" />
          </div>
        </div>
        <div className="row m-4">
          <div className="col">
            <input className='bg-light rounded-2 border-0 p-2' type="text" placeholder="Username"/>
          </div>
        </div>
        <div className="row m-5">
          <div className="col">
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to="/multiplayer/waitingRoomStudent"
            >
              <button className='px-5 p-3 btn btn-lg btn-secondary rounded-pill'>Enter Room</button>
            </Link>
          </div>
          <div className="col">
              <Link style={{color: "inherit",textDecoration: "none"}}
                  to="/multiplayer/choice">
                    <button type="button" className="px-5 p-3 btn btn-lg btn-secondary rounded-pill">
                        Go Back
                    </button>
              </Link>
          </div>
        </div>
      </div>


    </div>
  )
}

export default JoinQuiz