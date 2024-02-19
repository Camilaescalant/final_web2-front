import style from "./style.module.css";

const ButtonComponent = ({ type, actionClick, text }) => {
  return (
    <button className={style[type]} onClick={() => actionClick()}>
      {text}
    </button>
  );
};

export default ButtonComponent;
