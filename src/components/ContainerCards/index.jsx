import { useEffect, useState, lazy, Suspense } from "react";
import style from "./style.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Elem = lazy(() => import("../Card"));

const ContainerCardsComponent = () => {
  const [superheroe, setSuperheroe] = useState([]);
  const [myHeroe, setMyHeroe] = useState([]);
  const state = useSelector((state) => state);
  const idUser = localStorage.getItem("userId");

  /* Acciones de pedir datos */
  const pedirSuperheroes = async () => {
    const { data } = await axios.get(`https://finalweb2-api-production.up.railway.app/superheroe`);
    setSuperheroe(data);
  };

  const pedirMisSuperheroes = async () => {
    if (idUser) {
      const { data } = await axios.get(
        `https://finalweb2-api-production.up.railway.app/superheroe/mysuperhero/${idUser}`
      );
      console.log(data)
      setMyHeroe(data.Superheroes);
    }
  };

  const eliminarMySuperheroe = async (idHeroe) => {
    const { data } = await axios.post(
      `https://finalweb2-api-production.up.railway.app/superheroe/delete/`,
      {
        userId: idUser,
        superheroeId: idHeroe,
      }
    );
    console.log(data);
    setMyHeroe(data.Superheroes);
  };

  const agregarSuperheroe = async (idHeroe) => {
    const { data } = await axios.post(`https://finalweb2-api-production.up.railway.app/superheroe/add`, {
      userId: idUser,
      superheroeId: idHeroe,
    });
    setMyHeroe(data.Superheroes);
  };

  useEffect(() => {
    pedirSuperheroes();
    pedirMisSuperheroes();
  }, []);

  return (
    <>
      <div className={style.container}>
      {!state.flag && (
          <>
            {superheroe &&
              superheroe.map((item, index) => {
                return (
                  <Suspense key={index} fallback={<p>Loading</p>}>
                    <Elem
                      type={"heroe"}
                      item={item}
                      index={index}
                      key={index}
                      notAdd={false}
                      agregarSuperheroe={agregarSuperheroe}
                    />
                  </Suspense>
                );
              })}
          </>
        )}
        {state.flag && (
          <>
            {myHeroe &&
              myHeroe.map((item, index) => {
                return (
                  <Suspense key={index} fallback={<p>Loading</p>}>
                    <Elem
                      type={"heroe"}
                      item={item}
                      index={index}
                      key={index}
                      notAdd={true}
                      eliminarMySuperheroe={eliminarMySuperheroe}
                    />
                  </Suspense>
                );
              })}
          </>
        )}
      </div>
    </>
  );
};

export default ContainerCardsComponent;
