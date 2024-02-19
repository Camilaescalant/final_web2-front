import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import style from "./style.module.css";
import axios from "axios";
const AbmPages = () => {
  const [superheroe, setSuperheroe] = useState([]);
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const data = localStorage.getItem("userId");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await userData();
    await superheroeData();
  };
  const superheroeData = async () => {
    const { data } = await axios.get(`https://finalweb2-api-production.up.railway.app/superheroe`);
    setSuperheroe(data);
  };
  const userData = async () => {
    const { data } = await axios.get("https://finalweb2-api-production.up.railway.app/abm/user");
    setUsers(data);
  };

  const deleteUser = async (userId) => {
    const aux = users.filter((i) => i.id !== userId);

    setUsers(aux);
    await axios.delete(`https://finalweb2-api-production.up.railway.app/abm/user/${userId}`);
  };

  const promoteRol = async (userId, rol) => {
    const { data } = await axios.put("https://finalweb2-api-production.up.railway.app/abm/user/rol", {
      userId: userId,
      rol: rol,
    });
    setUsers(data);
  };

  const deleteHeroe = async (superheroeId) => {
    const aux = superheroe.filter((i) => i.id !== superheroeId);

    setSuperheroe(aux);
    await axios.delete(`https://finalweb2-api-production.up.railway.app/abm/superheroe/${superheroeId}`);
  };

  return (
    <>
      {!data ? (
        <Navigate to="/login" />
      ) : (
        <div className={style.container}>
          <button
            type="button"
            className={style.button}
            onClick={() => navigate("/profile")}
          >
            Volver al inicio
          </button>
          <div className={style.containerUser}>
            {users &&
              users.map((item, index) => {
                return (
                  <div className="card" key={index}>
                    <img src={item.photoUrl} alt="" />
                    <p>Nombre: {item.name}</p>
                    <p>Rol: {item.rol == 2 ? "Normal" : "Admin"}</p>
                    <p>Email: {item.email}</p>
                    <p>Nickname {item.nickname}</p>
                    <button
                      type="button"
                      className={style.button}
                      onClick={() => deleteUser(item.id, index)}
                    >
                      Eliminar Usuario
                    </button>
                    {item.rol == 2 ? (
                      <button
                        type="button"
                        className={style.button}
                        onClick={() => promoteRol(item.id, 1)}
                      >
                        Promover a admin
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={style.button}
                        onClick={() => promoteRol(item.id, 2)}
                      >
                        Revocar admin
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
          <div className={style.containerCards}>
            {superheroe.map((item, index) => {
              return (
                <div key={index}>
                  <div>
                    <img
                      src={item.imagesm}
                      alt=""
                      width="200"
                      height="200"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <button
                      className={style.pressableDelete}
                      type="button"
                      onClick={() => deleteHeroe(item.id, index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default AbmPages;
