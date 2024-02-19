import ContainerCardsComponent from "../../components/ContainerCards";
import NavbarComponent from "../../components/Navbar";
import { Navigate } from "react-router-dom";
import styles from "./styles.module.css";

const HomePage = () => {
  const data = localStorage.getItem("userId");

  return (
    <>
      {!data ? (
        <Navigate to="/login" />
      ) : (
        <>
          <NavbarComponent />
          <div className={styles.container}>
            <div className={styles.containerCard}>
              <ContainerCardsComponent />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
