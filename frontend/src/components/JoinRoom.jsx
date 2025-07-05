import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function JoinRoom() {


    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate()

    const createRoom = async() => {
        
          
           try {
              if(roomId && roomId.length === 6){
                      
             const res = await fetch(`http://192.168.0.104:3000/api/rooms/join`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                   
                },
                body: JSON.stringify({
                    roomId:roomId
                })
             })

             const data = await res.json()

             if(res.status === 200 ){
               navigate(`/${roomId}`)
             }
              }else{
                alert("enter only six alphanumerice value")
              }
           } catch (error) {
            console.log("error : ", error)
           }
        }
     
  return (

    <div className='h-[100vh] flex justify-center items-center bg-amber-200'>
    <div className='w-[40vw] h-[30vh] bg-white rounded-2xl flex flex-col justify-center items-center gap-8 '>
        <input className="border-2 h-10 rounded-2xl px-6 py-5 text-black"   type="text" onChange={(e) => setRoomId(e.target.value)} value={roomId} placeholder='please enter room Id'></input>
    <button type='button' onClick={createRoom} className='border-2 px-6 py-2 rounded-2xl text-white bg-black cursor-pointer'>create/ join-room</button>
    </div>
    </div>

  )
}
