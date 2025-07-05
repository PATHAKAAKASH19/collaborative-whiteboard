import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Room from './components/Room.jsx'
import JoinRoom from './components/JoinRoom.jsx'


import {createBrowserRouter, RouterProvider} from "react-router-dom"


const router = createBrowserRouter([
  {
   path:"/",
   element:<App></App>,
   children:[
    {
      path:"",
      element:<JoinRoom/>
    },
    {
    path:":roomId",
    element:<Room></Room>
   }
  
  ]

}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
