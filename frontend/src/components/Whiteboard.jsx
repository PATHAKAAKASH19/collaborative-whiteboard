import React, {useState, useEffect, useRef} from 'react'
import { usePencilColor } from '../context/PencilColorContext'
import { useLineWidth } from '../context/LineWItdhContext'

export default function Whiteboard({socket, currentRoomId}) {


  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const {pencilColor, setPencilColor} = usePencilColor()
  const {lineWidth, setLineWidth} = useLineWidth()

  useEffect(() => {
    
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight;

                                                                              
    

    const context = canvas.getContext("2d");

    
    context.lineCap = "round";
    context.strokeStyle = `black`;
    context.lineWidth= 5;
    contextRef.current = context;
  }, [])


  useEffect(() =>{
 

      contextRef.current.strokeStyle = `${pencilColor}`
      contextRef.current.lineWidth = lineWidth
    
  }, [pencilColor, lineWidth])
  
  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();

    if(evt.touches){
       return {
        x: (evt.touches?.[0]?.clientX- rect.left) * (canvas.width / rect.width),
        y:(evt.touches?.[0]?.clientY- rect.top) * (canvas.height / rect.height),
       }
    }

      return {
      x: (evt.clientX  - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
  
  };



    const startDrawing = (e) => {
    
            const mousePos = getMousePos(canvasRef.current, e);
        
        contextRef.current.beginPath()
        contextRef.current.moveTo(mousePos.x, mousePos.y)
        setIsDrawing(true)

        socket.emit("draw-start", {
          x:mousePos.x,
          y:mousePos.y,
          pencilColor:pencilColor,
          lineWidth:lineWidth,
          roomId:currentRoomId
        })

    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)

        socket.emit("draw-end",{
          roomId:currentRoomId
        } )

    }

    const move = (e) => {
    
        if(!isDrawing){
            return
        }
       const mousePos = getMousePos(canvasRef.current, e);
       contextRef.current.lineTo(mousePos.x, mousePos.y)
       contextRef.current.stroke()

       socket.emit("draw-move", {
        x:mousePos.x,
        y:mousePos.y,
        roomId:currentRoomId,
       })
    }


    const clearCanvas = () => {
       contextRef.current.clearRect(0,0 , canvasRef.current.width, canvasRef.current.height)
       socket.emit("clear-canvas", {
          width:canvasRef.current.width,
         height:canvasRef.current.height,
          roomId:currentRoomId
       })
    }




  useEffect(() => {
  if (!socket) {
    return;
  }

  socket.on('draw-start', (data) => {
    if (data.roomId !== currentRoomId) return;
    contextRef.current.beginPath();
    contextRef.current.moveTo(data.x, data.y);
    
    setPencilColor(`${data.pencilColor}`)
    setLineWidth(data.lineWidth)
  });

  socket.on('draw-move', (data) => {
    if (data.roomId !== currentRoomId) return;
    contextRef.current.lineTo(data.x, data.y);
    contextRef.current.stroke();
  });

  socket.on('draw-end', (data) => {
    if (data.roomId !== currentRoomId) return;
    contextRef.current.closePath();
  });

  socket.on("clear-canvas", () => {
         
       contextRef.current.clearRect(0,0 , canvasRef.current.width, canvasRef.current.height)
  })

  return () => {
    socket.off('draw-start');
    socket.off('draw-move');
    socket.off('draw-end');
  };
}, [socket, currentRoomId]);
  return (
  <>
   <button type='button' className='flex h-2xl  absolute top-0 right-[30px] bg-amber-200 px-4 py-2 black' onClick={clearCanvas}>clear canvas</button>
     <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={move}
      onTouchStart={startDrawing}
      onTouchMove={move}
      onTouchEnd={finishDrawing}
     
      className='bg-white w-6xl h-6xl border-2'
      ref={canvasRef}
     />  
</>
  )
}