import React, { useEffect, useState } from 'react'
import Whiteboard from './Whiteboard'
import ToolBar from './ToolBar'
import io from "socket.io-client" 
import { useParams } from 'react-router-dom'

export default function Room() {

   const [socket, setSocket] = useState(null)
   const  {roomId}  = useParams()


   useEffect(() => {
      const newSocket = io(`http://192.168.0.104:3000`)

      console.log(roomId, newSocket)
      if(newSocket){
      newSocket.emit("join-room", roomId)
      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }}
   }, [roomId])






  return (
    <div className='flex flex-col bg-gray-600 w-screen h-screen justify-center items-center gap-9'>

        <ToolBar></ToolBar>
        <Whiteboard socket={socket} currentRoomId={roomId}/>
    </div>
  )
}
