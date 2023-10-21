import { createContext, useState } from "react";

export const UseTurnoContext = createContext();

export function UseNumTurno({ children }) {
  const [detalleObjet, setDetalleObjet] = useState([]);

  return (
    <UseTurnoContext.Provider value={{ detalleObjet, setDetalleObjet }}>
      {children}
    </UseTurnoContext.Provider>
  );
}
