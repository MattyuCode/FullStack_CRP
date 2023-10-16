/* eslint-disable react/prop-types */
import profileImg from "../../../assets/CORPACAM.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { API } from "../../Helpers/APIs";
import Li from "./NavIconTitle/Li";
import { VscGraphLine, VscLayersActive } from "react-icons/vsc";
import { Collapse } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import md5 from "md5";

export const Sidebar = ({ show, setShow }) => {
  // const [isActive, setIsActive] = useState("/");
  const navigate = useNavigate();
  let token = localStorage.getItem("accessToken");
  const [menuItems, setMenuItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(false);
  const [menuData, setMenuData] = useState({ groups: {}, pathMenus: {} });
  const [isMenu, setIsMenu] = useState(false);
  const [usuario, setUsuario] = useState(localStorage.getItem("USERS"));
  const API_Services = import.meta.env.VITE_APP_MY_ENV_API;
  const { user, password } = useContext(UserContext);

  // useEffect(() => {
  // const tokenCheckInterval = setInterval(async function () {
  setInterval(async () => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime - 30) {
          await generateNewToken();
        }
      } catch (err) {
        console.error("Error al decodificar el token:", err);
      }
    } else {
      console.log("No se encontró ningún token");
    }
  }, 10000);

  //   return () => {
  //     clearInterval(tokenCheckInterval);
  //   };
  // }, [token]);

  const generateNewToken = async () => {
    try {
      const response = await fetch(`${API_Services}/Login/Jwt_Login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: md5(password).toUpperCase(),
          nombreApp: "LOG",
        }),
      });

      let data = await response.json();
      data = JSON.parse(data);

      if (data.msg != null) {
        console.error("Error al generar el nuevo token:", data.msg);
      } else {
        localStorage.setItem("accessToken", data["access_token"]);
        token = data["access_token"];
        // console.log("Nuevo token generado exitosamente:", data["access_token"]);
      }
    } catch (error) {
      console.error("Error al generar el nuevo token:", error);
    }
  };

  useEffect(() => {
    // const fechaActual = new Date();
    // if (token_jwt_decode.exp * 1000 < fechaActual.getTime()) {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("USERS");
    // localStorage.removeItem("NO_CIA");
    // localStorage.removeItem("USERS");
    // navigate("/");
    // generateNewToken();
    //  } else {
    if (!isMenu) {
      API(token).then((response) => {
        setMenuData(response);
        setMenuItems(
          Object.keys(response.groups).map((key) => ({
            title: key,
            items: response.groups[key],
          }))
        );
        setIsMenu(true);
      });
    }
    // }
  }, [isMenu, token]);

  function handleItemClick(paginas) {
    const subMenuName = menuData.pathMenus[paginas];
    navigate(`${subMenuName}`);
  }

  // const handleClickPath = (path) => setIsActive(path);

  const logout = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("USERS");
    localStorage.removeItem("NO_CIA");
    setUsuario(null);
  };

  return (
    <>
      {/* <main className={show ? 'space-toggle' : null}> */}
      <header
        className={`header ${show ? "space-toggle" : null} `}
        style={{ zIndex: "5" }}
      >
        <div className="header-toogle" onClick={() => setShow(!show)}>
          <i className="fas fa-bars "></i>
        </div>

        <div className="divTexto">
          <div
            onClick={logout}
            style={{ color: "white" }}
            className="link-logout"
          >
            <i className="fas fa-sign-out-alt nav-link-icon"></i>{" "}
            <span className="nav-link-name"></span>
          </div>

          <span style={{ margin: "0 30px 0" }}>{usuario} </span>
          <div className="user">
            <img className="profiel-img" src={profileImg} alt="" />
          </div>
        </div>
      </header>

      <aside
        className={`sidebar ${show ? "show" : "hidden"}`}
        style={{ zIndex: "6" }}
      >
        <nav className="navbars">
          <div className="">
            <div className="imagen_logo">
              <div className="profile">
                <img className="profiel-img" src={profileImg} alt="" />
              </div>
              <span>CORPACAM</span>
            </div>

            {/* <Link
              to="/dashboard"
              className={`nav-logo ${
                isActive === "/dashboard" ? "active" : ""
              }`}
              onClick={() => handleClickPath("/dashboard")}
            >
              <i className="fas fa-tachometer-alt  nav-logo-icon"></i>
              <span className="nav-link-name">Dashaboard</span>
            </Link> */}

            <div className="nav-list">
              {menuItems.map((item, index) => (
                <li
                  key={item.title}
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? false : index)
                  }
                  style={{ listStyle: "none" }}
                >
                  {activeIndex === index ? (
                    <Li Icon={VscGraphLine} title={item.title} />
                  ) : (
                    <Li Icon={VscLayersActive} title={item.title} />
                  )}
                  <Collapse in={activeIndex === index}>
                    <ul style={{ paddingLeft: "20px" }}>
                      {item.items.map((subitem) => (
                        <li key={subitem} style={{ listStyle: "none" }}>
                          <Li
                            Icon={VscLayersActive}
                            title={subitem}
                            onClick={() => handleItemClick(subitem)}
                          />
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </li>
              ))}

              {/* <Link
                to="/home"
                className={`nav-links ${isActive === "/home" ? "active" : ""}`}
                onClick={() => handleClickPath("/home")}
              >
                <i className="fas fa-home nav-link-icon"></i>
                <span className="nav-link-name">Home</span>
              </Link>

              <Link
                to="/tarea"
                className={`nav-links ${isActive === "/tarea" ? "active" : ""}`}
                onClick={() => handleClickPath("/tarea")}
              >
                <i className="fas fa-tasks nav-link-icon"></i>
                <span className="nav-link-name">Tareas</span>
              </Link>

              <Link
                to="/proyecto"
                className={`nav-links ${
                  isActive === "/proyecto" ? "active" : ""
                }`}
                onClick={() => handleClickPath("/proyecto")}
              >
                <i className="fas fa-project-diagram nav-link-icon"></i>
                <span className="nav-link-name">Protectos</span>
              </Link> */}
            </div>
          </div>

          <div
            onClick={logout}
            className="nav-links"
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-sign-out-alt nav-link-icon"></i>
            <span className="nav-link-name">Logout</span>
          </div>
        </nav>
      </aside>
      {/* </main> */}
    </>
  );
};
