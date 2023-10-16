import { createContext, useState } from "react";

export const UseTurnoContext = createContext();

export function UseNumTurno({ children }) {
  const [numTurnoContext, setNumTurnoContext] = useState(null);

  return (
    <UseTurnoContext.Provider value={{ numTurnoContext, setNumTurnoContext }}>
      {children}
    </UseTurnoContext.Provider>
  );
}
