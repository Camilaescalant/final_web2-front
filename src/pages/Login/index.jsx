import ButtonComponent from "../../components/Buttom";
import InputComponent from "../../components/Input";
import { Navigate } from "react-router-dom";
import style from "./styles.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  
  return (
    <>
      {user && <Navigate to="/" />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Ingrese un mail válido")
            .required("Ingrese un email"),
          password: Yup.string().required("Ingrese una contraseña"),
        })}
        onSubmit={async (values) => {
          await axios
            .post("http://localhost:5000/auth/login", values)
            .then(({ data }) => {
              console.log(data);
              localStorage.setItem("userId", data.id);
              localStorage.setItem("email", data.email);
              
               navigate("/"); 
            });
        }}
      >
        {(formik) => (
          <Form>
            <div className={style.container}>
              <div className={style.containerInput}>
                <h2>Login</h2>
                <InputComponent
                  label="Email Address"
                  name="email"
                  type="inputDefault"
                  placeholder="jane@formik.com"
                />
                <InputComponent
                  label="Contraseña"
                  name="password"
                  type="inputDefault"
                  placeholder="Ingrese una contraseña"
                />
                <ButtonComponent
                  text={"ACEPTAR"}
                  type={"button"}
                  actionClick={formik.onSubmit}
                />
                <a href="http://localhost:5173/register">O Registrarse</a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
