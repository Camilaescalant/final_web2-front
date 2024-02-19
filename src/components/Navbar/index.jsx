import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../redux/action-creators";
import styles from "./style.module.css";
import ButtonComponent from "../Buttom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { flag } = useSelector((state) => state);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const goProfile = () => {
    navigate("/profile");
  };

  const my = () => {
    dispatch(api.myHeroe());
  };
  const all = () => {
    dispatch(api.allHeroe());
  };
  return (
    <div className={styles.navbar}>
      <h3>SuperHeroe APP</h3>
      <ButtonComponent
        type={"botonMenu"}
        actionClick={goProfile}
        text="Ver mi perfil"
      />

      <div className={styles.button}>
        <ButtonComponent
          type={flag ? "botonMenu" : "botonMenuActive"}
          actionClick={all}
          text="Ver todos"
        />
        <ButtonComponent
          type={!flag ? "botonMenu" : "botonMenuActive"}
          actionClick={my}
          text="Ver mi team"
        />
      </div>
      <div className={styles.logut}>
        <ButtonComponent
          type={"botonMenu"}
          actionClick={logout}
          text="Salir de mi cuenta"
        />
      </div>
    </div>
  );
};

export default NavbarComponent;
