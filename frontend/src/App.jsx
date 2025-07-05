
import { Outlet } from "react-router-dom"
import { PencilColorContextProvider } from "./context/PencilColorContext.jsx"
import { LineWidthContextProvider } from "./context/LineWItdhContext.jsx"

function App() {


  return (
   <PencilColorContextProvider>
    <LineWidthContextProvider>
      <Outlet></Outlet>
    </LineWidthContextProvider>
  </PencilColorContextProvider>
  )
}

export default App
