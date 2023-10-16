import { BrowserRouter as MyRoute, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./Components/Routes/ProtectedRoutes";
import { Dashboard } from "./Components/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import { Home } from "./Components/Pages/Home/Home";
import Login from "./Components/Auth/Login";
import Traslado from "./Components/Pages/Traslado/Traslado";
import { StateCompo } from "./Components/Context/StateCompo";
import { Turno } from "./Components/Pages/Turno/Turno";
import ModalTurno from "./Components/Pages/Turno/ModalTurno";

import { CrearTurno } from "./Components/Pages/Turno/CrearTurno";
import TablaDetalleTurno from "./Components/Pages/Turno/TablaDetalleTurno";
import { UseNumTurno } from "./Components/Context/UseNumTurno";

function App() {
  return (
    <>
      <MyRoute>
        <UseNumTurno>
          <StateCompo>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoutes />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/traslado" element={<Traslado />} />
                <Route path="/turno" element={<Turno />} />
                <Route path="/modalTurno" element={<ModalTurno />} />
                <Route path="/addTurno" element={<CrearTurno />} />
                <Route
                  path="/tablaDetalleTurno"
                  element={<TablaDetalleTurno />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StateCompo>
        </UseNumTurno>
      </MyRoute>
    </>
  );
}

export default App;
