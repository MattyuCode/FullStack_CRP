import md5 from "md5";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/CORPACAM.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const API_Services = import.meta.env.VITE_APP_MY_ENV_API;
  const navigate = useNavigate();
  const { setUser, setPassword } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    loading: false,
  });

  const fetchData = async (user, pass) => {
    const respon = await fetch(`${API_Services}/Login/Jwt_Login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: md5(pass).toUpperCase(),
        // username: "ADMINISTRADOR",
        // password: "202CB962AC59075B964B07152D234B70",
        nombreApp: "LOG",
      }),
      
    });
    let data = await respon.json();
    data = JSON.parse(data);

    if (data.msg != null) {
      console.log(data.msg);
      toast.error(data.msg, {
        theme: "colored",
      });
      setForm({ ...form, loading: false });
    } else {
      navigate("/traslado");

      localStorage.setItem("NO_CIA", data.no_cia);
      localStorage.setItem("accessToken", data["access_token"]);
      localStorage.setItem("USERS", data.usuario);
      //localStorage.setItem("NO_CIA", data.no_cia);
    }
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    let inputName = form.username;
    let inputPass = form.password;

    let result = true;
    if (!inputName.trim() || !inputPass.trim()) {
      result = false;
      console.log("no hay datos");
      toast.error("Campos Obligatorios", {
        theme: "colored",
      });
    } else {
      setForm({ ...form, loading: true });
      fetchData(inputName, inputPass);

      //BUG: AQUI SE GUARDA LOS DATOS DEL USUARIO
      setUser(inputName);
      setPassword(inputPass);
    }
    return result;
  };

  const handlePasswordChange = (e) => {
    setForm({ ...form, password: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="sect">
      <div className="formu">
        <img src={logo} alt="Descripción de la imagen" />
        <h3 className="text-center mt-3" style={{ color: "#5ca35c" }}>
          Logistica
        </h3>
        <form onSubmit={enviarDatos}>
          <label>
            <span className="spUser"> Usuario:</span>

            <input
              className="form-control InptText"
              type="text"
              value={form.username}
              name="username"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
            <i className="fas fa-user icnos" style={{ margin: "0 5px" }}></i>
          </label>
          <br />
          <label>
            <span className="spPass">Contraseña:</span>
            <input
              className="form-control inptpassword"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handlePasswordChange}
            />
            <i className="fas fa-lock icnos" style={{ margin: "0 5px" }}></i>
            <i
              className={`fas ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } iconVer`}
              onClick={togglePasswordVisibility}
            ></i>
          </label>
          <br />
          <button
            className="btn btn-success w-100 botonSess"
            type="submit"
            disabled={form.loading}
          >
            {form.loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp; {"Iniciando Session..."}
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
