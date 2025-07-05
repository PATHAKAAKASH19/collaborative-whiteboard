
import { createContext, useContext, useState } from "react";

const PencilColorContext = createContext();

export const PencilColorContextProvider = ({children}) => {
  const [pencilColor, setPencilColor] = useState("black");

  return (
    <PencilColorContext.Provider value={{pencilColor, setPencilColor }}>
      {children}
    </PencilColorContext.Provider>
  );
};

export const usePencilColor = () => useContext(PencilColorContext);