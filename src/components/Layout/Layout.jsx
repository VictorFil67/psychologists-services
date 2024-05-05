import { useState } from "react";
import { Outlet } from "react-router-dom";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/selectors";
import { logout } from "../../store/auth/authSlice";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { toast } from "react-toastify";

export const Layout = () => {
  const [modalRegistration, setModalRegistration] = useState(false);
  const [modalLogIn, setModalLogIn] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  function open(setModal) {
    setModal(true);
  }
  function close() {
    setModalRegistration(false);
    setModalLogIn(false);
  }
  function getExit() {
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  return (
    <div>
      <header>Layout</header>
      {!user ? (
        <>
          <button
            onClick={() => {
              open(setModalLogIn);
            }}
          >
            Log In
          </button>
          <button
            onClick={() => {
              open(setModalRegistration);
            }}
          >
            Registration
          </button>
        </>
      ) : (
        <button onClick={getExit}>Log Out</button>
      )}
      {modalLogIn && <LoginForm close={close} />}
      {modalRegistration && <RegisterForm close={close} />}
      <Outlet />
    </div>
  );
};
