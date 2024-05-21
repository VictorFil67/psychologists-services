import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/selectors";
import { logout } from "../../store/auth/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import s from "./Layout.module.css";
import AvatarIconSvg from "../../images/SvgAvatarIcon";
import SvgBurgerMenu from "../../images/SvgBurgerMenu";

export const Layout = () => {
  const [modalRegistration, setModalRegistration] = useState(false);
  const [modalLogIn, setModalLogIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  // console.log(mobileMenu);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  function open(setModal) {
    setModal(true);
  }
  function close() {
    setModalRegistration(false);
    setModalLogIn(false);
  }
  function getExit() {
    const auth = getAuth();
    // setPersistence(auth, inMemoryPersistence)
    signOut(auth)
      .then(() => {
        dispatch(logout());
        toast.success(`Sign-out successful. Goodbye!`);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    // dispatch(logout());
  }
  useEffect(() => {
    if (modalRegistration || modalLogIn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalRegistration, modalLogIn]);

  return (
    <>
      {location.pathname === "/" && <div className={s.background}></div>}
      <header className={s.header}>
        <div className={s.container}>
          <div
            className={
              location.pathname === "/"
                ? s.headerWrap
                : s.headerWrap + " " + s.largeGap
            }
          >
            <Link to={"/"} className={s.logo}>
              <span className={s.logoSpan}>psychologists.</span>services
            </Link>

            <div className={s.navWrap}>
              <nav className={mobileMenu ? s.nav + " " + s.active : s.nav}>
                <NavLink
                  to={"/"}
                  className={s.pageLink}
                  onClick={() => {
                    setMobileMenu(false);
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/psychologists"}
                  className={s.pageLink}
                  onClick={() => {
                    setMobileMenu(false);
                  }}
                >
                  Psychologists
                </NavLink>
                {user && (
                  <NavLink
                    to={"/favorites"}
                    className={s.pageLink}
                    onClick={() => {
                      setMobileMenu(false);
                    }}
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
            <button className={s.menuButton} onClick={setMobileMenu}>
              <SvgBurgerMenu />
            </button>
            {modalLogIn && <LoginForm close={close} />}
            {modalRegistration && <RegisterForm close={close} />}
          </div>
        </div>
      </header>
      <main>
        <div className={s.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
};
