/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../Pages/Sidebar/Sidebar";
import { useEffect, useState } from "react";

export const ProtectedRoutes = () => {
  const [show, setShow] = useState(localStorage.getItem("active") === "true");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("active", show.toString());
  }, [show]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={show ? "space-toggle" : null}>
      <Sidebar show={show} setShow={setShow} />
      <Outlet />
    </main>
  );
};
