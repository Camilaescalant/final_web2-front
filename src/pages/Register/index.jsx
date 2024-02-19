import ButtonComponent from "../../components/Buttom";
import InputComponent from "../../components/Input";
import { Navigate } from "react-router-dom";
import style from "./style.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  return (
    <>
      {user && <Navigate to="/" />}
      <Formik
        initialValues={{
          name: "",
          nickname: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Ingrese su nombre"),
          email: Yup.string()
            .email("Ingrese un mail válido")
            .required("Ingrese un email"),
          nickname: Yup.string().required("Ingrese un nickname"),
          password: Yup.string().required("Ingrese una contraseña"),
        })}
        onSubmit={async (values) => {
          await axios
            .post("http://localhost:5000/auth/register", values)
            .then(({ data }) => {
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
                <h2>Registro</h2>
                <InputComponent
                  label="Nombre"
                  name="name"
                  type="inputDefault"
                  placeholder="Ingrese un nombre"
                />
                <InputComponent
                  label="Nickname"
                  name="nickname"
                  type="inputDefault"
                  placeholder="Ingrese un nickname"
                />
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterPage;
