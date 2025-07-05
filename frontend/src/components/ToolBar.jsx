import React from 'react'
import { usePencilColor } from '../context/PencilColorContext'
import { useLineWidth } from '../context/LineWItdhContext'



export default function ToolBar() {


  const {lineWidth, setLineWidth} = useLineWidth()  
   
   const {pencilColor, setPencilColor} = usePencilColor()

   const colorOption = ["black", "red", "blue", "green"]


   const changePencilColor = (e) => {
     setPencilColor(e.target.value)
   }

   const changeLineWidth = (e)=> {
    setLineWidth(Number(e.target.value))
   }
  return (
    <div className='fixed top-1 h-30 flex  gap-4 items-center justify-center border-2 bg-amber-200 flex-col px-4 py-2 rounded-2xl'> 
        <div className='py-2 px-4 border-2  bg-white'>
            <select value={pencilColor} onChange={changePencilColor} >
                {colorOption.map((color, i) => (<option value={`${color}`} key={i}>{color}</option>))}
            </select>
        </div>


        <div className='px-4 py-2 bg-white'>
            <input type="range" name="volume" min="0" max="100" value={lineWidth} onChange={changeLineWidth}></input>
        </div>
    </div>
  )
}
