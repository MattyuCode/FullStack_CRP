/* eslint-disable react/prop-types */
import { useState } from "react";
import { UserContext } from "./UserContext";




export function StateCompo({ children }) {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
}
