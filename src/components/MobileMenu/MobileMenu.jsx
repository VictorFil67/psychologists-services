import { NavLink } from "react-router-dom";
import SvgClose from "../../images/modalIcons/SvgClose";
import s from "./MobileMenu.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/selectors";
import AvatarIconSvg from "../../images/SvgAvatarIcon";

export const MobileMenu = ({
  mobileMenu,
  closeMenu,
  open,
  setModalLogIn,
  setModalRegistration,
  getExit,
}) => {
  const user = useSelector(selectUser);
  console.log(mobileMenu);

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      closeMenu();
      console.log(e.target);
      console.log(e.currentTarget);
    }
  }

  document.addEventListener("keydown", onWindowEscape);
  function onWindowEscape(e) {
    if (e.code === "Escape") {
      closeMenu();
      //   console.log("first");
      document.removeEventListener("keydown", onWindowEscape);
    }
  }

  return (
    <div className={s.overlay} onClick={handleClick}>
      <div className={mobileMenu && s.menu + " " + s.active}>
        <button className={s.CloseBtn} onClick={closeMenu}>
          <SvgClose />
        </button>
        <nav className={s.nav}>
          <NavLink to={"/"} className={s.pageLink} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink
            to={"/psychologists"}
            className={s.pageLink}
            onClick={closeMenu}
          >
            Psychologists
          </NavLink>
          {user && (
            <NavLink
              to={"/favorites"}
              className={s.pageLink}
              onClick={closeMenu}
            >
              Favorites
            </NavLink>
          )}
        </nav>
        {/* </div> */}
        <div className={s.buttonsWrap}>
          {!user ? (
            <>
              <button
                className={s.loginButton}
                onClick={() => {
                  open(setModalLogIn);
                }}
              >
                Log In
              </button>
              <button
                className={s.registrationButton}
                onClick={() => {
                  open(setModalRegistration);
                }}
              >
                Registration
              </button>
            </>
          ) : (
            <>
              <div className={s.avatar}>
                <AvatarIconSvg />
                <p className={s.username}>{user?.name ?? "user"}</p>
              </div>
              <button className={s.logoutButton} onClick={getExit}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
