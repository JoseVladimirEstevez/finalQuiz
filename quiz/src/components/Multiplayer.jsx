import React, { useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import { SocketContext } from '../data/socketContext';

const SERVER_HOST = "http://localhost:5000";
function Multiplayer() {

    const socket = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        // On load
        socket.current = io(SERVER_HOST)
        //console.log("Connected to WS erver")
        navigate('choice');
    }, [])
  return (
    <SocketContext.Provider value={socket.current}>
      <Outlet/>
    </SocketContext.Provider>
  )
}

export default Multiplayer