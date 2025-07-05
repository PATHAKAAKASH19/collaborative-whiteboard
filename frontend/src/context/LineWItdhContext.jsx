

import { createContext, useContext, useState } from "react";

const LineWidthContext = createContext();

export const LineWidthContextProvider = ({children}) => {
  const [lineWidth, setLineWidth] = useState(1);

  return (
    <LineWidthContext.Provider value={{lineWidth, setLineWidth }}>
      {children}
    </LineWidthContext.Provider>
  );
};

export const useLineWidth = () => useContext(LineWidthContext);