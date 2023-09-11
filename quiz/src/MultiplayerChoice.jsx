import React, { useContext, useEffect } from 'react'
import { SocketContext } from './data/socketContext'
import { useNavigate } from 'react-router-dom'

function MultiplayerChoice() {

  //Use this on every component that emits/listens to WS events
  const socket = useContext(SocketContext)
  const navigate = useNavigate();

  useEffect(() => {
    // on load
    if(socket){
      socket.emit('reach10', {count:20})
    } else{
      navigate('/multiplayer')
      console.log('No socket found')
    }
  }, [])

  return (
    <div>
        <button>HOST</button>
        <button>JOIN</button>
    </div>
  )
}

export default MultiplayerChoice