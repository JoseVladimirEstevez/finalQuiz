import React from 'react'

function JoinQuiz() {
  return (
    <div>
      <div className="col d-md-flex justify-content-md-end">
        <button className='px-3 p-3 m-2 btn btn-lg btn-secondary rounded-pill'>Main menu</button>
      </div>
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
            <button className='px-5 p-3 m-2 btn btn-lg btn-secondary rounded-pill'>Enter Room</button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default JoinQuiz