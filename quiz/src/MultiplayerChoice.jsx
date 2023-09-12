import React, { useContext, useEffect } from 'react'
import { SocketContext } from './data/socketContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function MultiplayerChoice() {
  const socket = useContext(SocketContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.emit('reach10', { count: 20 })
    } else {
      navigate('/multiplayer')
      console.log('No socket found')
    }
  }, [])

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex p-5 text-center justify-content-center align-items-center "
    >
      <div className="d-flex ">
        <div className ="m-5">
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to="/multiplayer/joinQuiz"
          >
            <button
              type="button"
              className="px-5 p-3 btn btn-lg btn-secondary rounded-pill"
            >
              Join
            </button>
          </Link>
        </div>
        <div className ="m-5">
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to="/multiplayer/host"
          >
            <button
              type="button"
              className="px-5 p-3 btn btn-lg btn-secondary rounded-pill"
            >
              Host
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MultiplayerChoice
