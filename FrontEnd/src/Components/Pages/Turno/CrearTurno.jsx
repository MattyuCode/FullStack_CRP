import { IoArrowBackOutline } from "react-icons/io5";
import { BiSolidSave } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { TokenANDnoCia } from "../../Utilities/TokenANDnoCia";
import { Link } from "react-router-dom";
import TablaDetalleTurno from "./TablaDetalleTurno";
import { UseTurnoContext } from "../../Context/UseNumTurno";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CrearTurno = () => {
  const { noCia, token } = TokenANDnoCia();
  const API_Services = import.meta.env.VITE_APP_MY_ENV_API;
  const [companias, setCompanias] = useState([]);
  const [sede, setSede] = useState([]);
  const [tipoTurno, setTipoTurno] = useState([]);
  const [transportistas, setTransportistas] = useState([]);
  const [vehiculo, setVehiculo] = useState([]);
  const [pilotodata, setPilotodata] = useState([]);
  const [tipoData, setTipoData] = useState([]);

  const [selectedSede, setSelectedSede] = useState("");
  const [selectedCompania, setSelectedCompania] = useState({
    value: "10",
    label: "CORPACAM",
  });
  const [selectedTipoTurno, setSelectedTipoTurno] = useState("");
  const [selectedTransportistas, setSelectedTransportistas] = useState("");
  const [selectedVehiculo, setSelectedVehiculo] = useState("");
  const [selectedPiloto, setSelectedPiloto] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [marcaVehiculo, setMarcaVehiculo] = useState("");
  const [form, setForm] = useState({
    turnoOrigen: "",
    licencia: "",
  });
  const [internoCheck, setInternoCheck] = useState(true);
  const { numTurnoContext } = useContext(UseTurnoContext);

  useEffect(() => {
    const API_s = async () => {
      try {
        //NOTE: OBTENER TODAS LAS COMPANIAS
        const responseCompanias = await fetch(
          `${API_Services}/Turno/GetAllCompanias`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseCompanias.ok) {
          console.log("Algo salio mal");
        } else {
          const dataCompanias = await responseCompanias.json();
          setCompanias(dataCompanias);
        }

        //BUG: OBETNER LOS NO SEDES
        const responseSedes = await fetch(
          `${API_Services}/Turno/GetAllSedes/${selectedCompania.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseSedes.ok) {
          console.log("Algo salio mal");
        } else {
          const dataSede = await responseSedes.json();
          setSede(dataSede);
        }

        //FIXME: PARA OBETNER LOS TIPOS DE TURNO
        const responseTipoTurno = await fetch(
          `${API_Services}/Turno/GetTIPO_TURNO`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseTipoTurno.ok) {
          console.log("Algo salio mal");
        } else {
          const dataTipoTurno = await responseTipoTurno.json();
          setTipoTurno(dataTipoTurno);
        }

        //TODO: PARA OBETNER LOS TRANSPORTISTAS
        const responseTrans = await fetch(
          `${API_Services}/Turno/GetAllTransportista/${selectedCompania.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseTrans.ok) {
          console.log("Algo salio mal");
        } else {
          const dataTrans = await responseTrans.json();
          setTransportistas(dataTrans);
        }
        //TODO: PARA OBETNER LOS VEHICULOS
        const responseVehiculos = await fetch(
          `${API_Services}/Turno/GetVehiculo/${selectedCompania.value}/${selectedTransportistas.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseVehiculos.ok) {
          console.log("Algo salio mal");
        } else {
          const dataVehiculo = await responseVehiculos.json();
          setVehiculo(dataVehiculo);
        }

        //FIXME: PARA OBETNER LOS PILOTOS
        const responsePilotos = await fetch(
          `${API_Services}/Turno/GetPiloto/${selectedCompania.value}/${selectedTransportistas.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responsePilotos.ok) {
          console.log("Algo salio mal");
        } else {
          const dataPiloto = await responsePilotos.json();
          setPilotodata(dataPiloto);
        }

        //COMMENT: PARA OBETNER LOS TIPOS
        const responseTipo = await fetch(
          `${API_Services}/Turno/GetTipo/${selectedCompania.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseTipo.ok) {
          console.log("Algo salio mal");
        } else {
          const dataTipo = await responseTipo.json();
          setTipoData(dataTipo);
        }

        //COMMENT: PARA GENERAR EL NUMERO TURNO
        /*const responseNumTurno = await fetch(
          `${API_Services}/Turno/GetNumTurno/${noCia}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!responseNumTurno.ok) {
          // console.log("Algo salio mal");
        } else {
          const dataNumTurno = await responseNumTurno.json();
          setNumTurno(dataNumTurno);
          setNumTurnoContext(numTurno);
          console.log(dataNumTurno);
        }*/
      } catch (error) {
        // console.error(error.message);
      }
    };
    API_s();
  }, [
    API_Services,
    token,
    selectedCompania.value,
    selectedTransportistas.value,
    noCia,
  ]);

  const validateTurnoOrigen = async (e) => {
    e.preventDefault();

    if (selectedTipoTurno === "E") {
      try {
        const response1 = await fetch(
          `${API_Services}/Turno/ValidarTurnoUsado/${noCia}/${form.turnoOrigen}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data1 = await response1.json();

        if (data1 === true) {
          toast.info(`El número turno ${form.turnoOrigen} ya se esta usando`, {
            theme: "colored",
          });
        } else {
          const response2 = await fetch(
            `${API_Services}/Turno/TurnoExiste/${noCia}/${form.turnoOrigen}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data2 = await response2.json();

          if (data2 === true) {
            GuardarTurno();
          } else {
            toast.error(`${data2.message}`, {
              theme: "colored",
            });
          }
        }
      } catch (error) {
        // console.error("Hubo un error al realizar la solicitud:", error);
      }
    } else {
      GuardarTurno();
    }
  };

  const GuardarTurno = async () => {
    const numeroTurnoGenerado = numTurnoContext.toString();
    const resquestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        NO_CIA: noCia,
        NO_SEDE: selectedSede.value,
        TURNO: numeroTurnoGenerado,
        NUM_PLACA: internoCheck ? selectedVehiculo.label : selectedVehiculo,
        PILOTO: internoCheck ? selectedPiloto.value : "",
        NOMBRE_PILOTO: internoCheck ? selectedPiloto.label : selectedPiloto,
        TIPO_TURNO: selectedTipoTurno,
        TURNO_ORIGEN: selectedTipoTurno === "D" ? "" : form.turnoOrigen,
        INTERNO: internoCheck ? "S" : "N",
        TRANSPORTISTA: internoCheck ? selectedTransportistas.value : "",
        VEHICULO: internoCheck ? selectedVehiculo.value : "",
        TIPO_VEHICULO: selectedTipo.value,
        MARCA_VEHICULO: internoCheck ? marcaVehiculo : "",
        LICENCIA: form.licencia,
        USUARIO_CREA: localStorage.getItem("USERS"),
      }),
    };
    try {
      const response = await fetch(
        `${API_Services}/Turno/crearTurno`,
        resquestOptions
      );
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Turno guardado",
        text: "Turno registrado correctamente",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const optsCompany = companias.map((company) => ({
    value: company.NO_CIA,
    label: company.NOMBRE,
  }));

  const handleSelectedCompany = (company) => {
    setSelectedCompania(company);
    setSelectedSede("");
    setSelectedTransportistas("");
  };

  const optsSede = sede.map((sede) => ({
    value: sede.NO_SEDE,
    label: sede.PLANTA,
  }));

  const handleSelectedSede = (sede) => {
    setSelectedSede(sede);
  };

  const optsTrans = transportistas.map((item) => ({
    value: item.TRANSPORTISTA,
    label: item.DESCRIPCION,
  }));

  const handleSelectedTransport = (trans) => {
    setSelectedTransportistas(trans);
    setSelectedVehiculo("");
    setMarcaVehiculo("");
    setSelectedPiloto("");
  };

  const optsVehiculo = vehiculo.map((item) => ({
    value: item.VEHICULO,
    label: item.NUM_PLACA,
  }));

  const handleSelectedVehiculo = (item) => {
    const data = vehiculo.find((v) => v.VEHICULO === item.value);
    setMarcaVehiculo(data.MARCA);

    setSelectedVehiculo(item);
  };

  const optsPiloto = pilotodata.map((item) => ({
    value: item.PILOTO,
    label: item.DESCRIPCION,
  }));

  const handleSelectedPiloto = (item) => {
    setSelectedPiloto(item);
  };

  const optsTipo = tipoData.map((item) => ({
    value: item.TIPO_VEHICULO,
    label: item.DESCRIPCION,
  }));

  const handleSelectedTIpo = (item) => {
    setSelectedTipo(item);
  };

  const handleCheckboxChange = (event) => {
    setSelectedVehiculo("");
    setMarcaVehiculo("");
    setSelectedPiloto("");
    setInternoCheck(event.target.checked);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col-md-12">
          <span className="text-center titless">
            Creación de Turnos despacho pruducto terminado
          </span>
        </div>

        <div className="col-md-12">
          <div className="tab-content shadow" style={{ borderRadius: "15px" }}>
            {/* <form onSubmit={GuardarTurno} className="formuTurno"> */}
            <form onSubmit={validateTurnoOrigen} className="formuTurno">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">COMPAÑIA</label>
                      <Select
                        options={optsCompany}
                        value={selectedCompania}
                        onChange={handleSelectedCompany}
                        placeholder="Select a company"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">NO SEDE</label>
                      <Select
                        options={optsSede}
                        value={selectedSede}
                        onChange={handleSelectedSede}
                        placeholder="Select a SEDE"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">TIPO TURNO</label>
                    {tipoTurno.map((item, index) => (
                      <div className="form-check form-check-inline" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="tipoTurno"
                          id={`inlineRadio${item.TIPO_TURNO}`}
                          value={item.TIPO_TURNO}
                          checked={item.TIPO_TURNO === selectedTipoTurno}
                          onChange={() => setSelectedTipoTurno(item.TIPO_TURNO)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`inlineRadio${item.TIPO_TURNO}`}
                        >
                          {item.DESCRIPCION.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-12 mb-4 d-flex ">
                  <div className="form-check mt-4 col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={internoCheck}
                      onChange={handleCheckboxChange}
                      id="flexCheckChecked1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked1"
                    >
                      INTERNO
                    </label>
                  </div>

                  <div className=" mx-4 col-md-9">
                    <label className="form-label">TURNO ORIGEN</label>

                    <input
                      type="number"
                      placeholder="Escribe el turno origen"
                      className="form-control"
                      value={form.turnoOrigen}
                      onChange={(e) => {
                        setForm({ ...form, turnoOrigen: e.target.value });
                      }}
                      disabled={
                        selectedTipoTurno === "D" || selectedTipoTurno === "T"
                      }
                    />
                  </div>
                </div>
                {internoCheck ? (
                  <>
                    <div className="col-md-4 mb-4">
                      <label className="form-label">TRANSPORTISTA</label>

                      <Select
                        options={optsTrans}
                        value={selectedTransportistas}
                        onChange={handleSelectedTransport}
                        placeholder="Selecciona un transportista"
                      />
                    </div>

                    <div className="col-md-3 mb-4" style={{ zIndex: 5 }}>
                      <label className="form-label">VEHICULO</label>

                      <Select
                        options={optsVehiculo}
                        value={selectedVehiculo}
                        onChange={handleSelectedVehiculo}
                        placeholder="Selecciona un vehiculo"
                      />
                    </div>

                    <div className="col-md-5 mb-4" style={{ zIndex: 5 }}>
                      <label className="form-label">PILOTO</label>

                      <Select
                        options={optsPiloto}
                        value={selectedPiloto}
                        onChange={handleSelectedPiloto}
                        placeholder="Selecciona un piloto"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6 mb-4">
                      <label className="form-label">VEHICULO</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedVehiculo}
                        onChange={(e) => setSelectedVehiculo(e.target.value)}
                        placeholder="Escribe el número de la placa"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">PILOTO</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedPiloto}
                        onChange={(e) => setSelectedPiloto(e.target.value)}
                        placeholder="Escribe el nombre del piloto"
                      />
                    </div>
                  </>
                )}
                <div className="col-md-4 mb-4">
                  <label className="form-label">MARCA VEHICULO</label>
                  <input
                    type="text"
                    value={marcaVehiculo}
                    placeholder="Marca Vehiculo"
                    className="form-control"
                    readOnly
                  />
                </div>

                <div className="col-md-4 mb-4" style={{ zIndex: 3 }}>
                  <label className="form-label">TIPO</label>

                  <Select
                    options={optsTipo}
                    value={selectedTipo}
                    onChange={handleSelectedTIpo}
                    placeholder="Selecciona un tipo"
                  />
                </div>

                <div className="col-md-4 mb-4">
                  <label className="form-label">LICENCIA</label>

                  <input
                    type="text"
                    placeholder="Escribe la licencia"
                    className="form-control"
                    value={form.licencia}
                    onChange={(e) => {
                      setForm({ ...form, licencia: e.target.value });
                    }}
                  />
                </div>
              </div>

{/* detalles tuno */}
              <TablaDetalleTurno />

              <div className="row text-center">
                <div className="col-md-6">
                  <Link
                    to="/turno"
                    type="submit"
                    className="btnActivity btn w-75 btn-outline-danger btn-block text-decoration-none"
                  >
                    <IoArrowBackOutline /> Regresar
                  </Link>
                </div>
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn w-50 btn-outline-primary btn-lg"
                    style={{ borderRadius: 50, fontSize: 18 }}
                  >
                    <BiSolidSave /> Guardar
                  </button>
                </div>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};
