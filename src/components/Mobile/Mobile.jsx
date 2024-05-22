import s from "./Mobile.module.css";
import SvgClose from "../../images/modalIcons/SvgClose";

export const Mobile = ({ close }) => {
  function handleClick(e) {
    if (e.target === e.currentTarget) {
      close();
    }
  }

  document.addEventListener("keydown", onWindowEscape);
  function onWindowEscape(e) {
    if (e.code === "Escape") {
      close();
      console.log("first");
      document.removeEventListener("keydown", onWindowEscape);
    }
  }

  return (
    <div className={s.overlay} onClick={handleClick}>
      <div className={s.menu}>
        <button className={s.closeButton} onClick={close}>
          <SvgClose />
        </button>
      </div>
    </div>
  );
};
