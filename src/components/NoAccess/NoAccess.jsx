import SvgClose from "../../images/modalIcons/SvgClose";
import s from "./NoAccess.module.css";

export const NoAccess = ({ close }) => {
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
      <div className={s.modal}>
        <button className={s.closeButton} onClick={close} aria-label="close">
          <SvgClose />
        </button>
        <h1>No access! For authorized users only!</h1>
      </div>
    </div>
  );
};
