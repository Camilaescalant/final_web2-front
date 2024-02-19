import { useField } from "formik";
import style from "./style.module.css";

const InputComponent = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {type !== "search" ? (
        <>
          <input
            className={style[type]}
            type={`${props.name}`}
            placeholder={`${placeholder}`}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
        </>
      ) : (
        <input className={style.input} type="text" />
      )}
    </>
  );
};

export default InputComponent;
