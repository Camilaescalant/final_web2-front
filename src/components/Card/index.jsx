import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import style from "./style.module.css";
import ButtonComponent from "../Buttom";
import { useSelector } from "react-redux";

const CardComponent = ({ type, item, notAdd, eliminarMySuperheroe, agregarSuperheroe }) => {
  const { flag } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);


  return (
    <div className={style[type]}>
      {type === "heroe" && (
        <div className={style.containerImage} onClick={() => setOpen(true)}>
          {/* eslint-disable-next-line react/prop-types */}
          <img src={item.imagelg} />
        </div>
      )}
      {type === "heroe" && (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className={style.containerModal}>
            <div>
              <div className={style.imgModal}>
                <img src={item.imagesm} loading="lazy" />
                <p>Nombre: {item.name}</p>
              </div>
              <div className={style.containerStast}>
                <div>
                  <p>
                    <b>Powerstast</b>
                  </p>
                  <p>Inteligencia : {item.intelligence}</p>
                  <p>Fuerza : {item.strength}</p>
                  <p>Velocidad : {item.speed}</p>
                  <p>Durabilidad : {item.durability}</p>
                  <p>Poder : {item.power}</p>
                  <p>Combate : {item.combat}</p>
                </div>
              </div>
            </div>
            <div className={style.containerButton}>
              {!notAdd && (
                <ButtonComponent
                  type="button"
                  text="Agregar"
                  actionClick={() => agregarSuperheroe(item.id)}
                />
              )}
              {flag && (
                <ButtonComponent
                  type="button"
                  text="Eliminar"
                  actionClick={() => eliminarMySuperheroe(item.id)}
                />
              )}
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default CardComponent;
