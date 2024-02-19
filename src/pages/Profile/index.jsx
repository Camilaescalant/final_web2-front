import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import style from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const ProfilePages = () => {
  const data = localStorage.getItem("userId");
  const [state, setState] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const pedirDatosUsuario = () => {
    axios.get(`http://localhost:5000/user/info/${data}`)
    .then(({data}) => {
      setUser(data)
    })
  };

  useEffect(() => {
    pedirDatosUsuario();
  },[]);
  return (
    <>
      {!data ? (
        <Navigate to="/login" />
      ) : (
        <div className={style.container}>
          {state ? (
            <div className={style.containerProfile}>
              <h2>EDITAR PERFIL</h2>

              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Su email"
                required="required"
              />
              <input
                type="text"
                name="nickname"
                value={user.nickname}
                placeholder="Su nickname"
                required="required"
              />
              <button type="button" className={style.button}>
                ACEPTAR CAMBIOS
              </button>
              <button
                type="button"
                className={style.button}
                onClick={() => setState(false)}
              >
                DESCARTAR CAMBIOS
              </button>
            </div>
          ) : (
            <div className={style.containerProfile}>
              <img src={user.photoUrl} alt="" className={style.img} />
              <p>Hola {user.name}</p>
              <p>Nickname {user.nickname}</p>
              <p>Email {user.email} </p>
              <button
                type="button"
                className={style.button}
                onClick={() => setState(true)}
              >
                EDITAR
              </button>
              <button
                type="button"
                className={style.button}
                onClick={() => navigate("/")}
              >
                VOLVER AL INICIO
              </button>
              {user.rol == 1 && (
                <button
                  type="button"
                  className={style.button}
                  onClick={() => navigate("/abm")}
                >
                  ABM USUARIOS
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePages;
