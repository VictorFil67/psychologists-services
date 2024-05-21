import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import s from "./RegisterForm.module.css";
import SvgClose from "../../images/modalIcons/SvgClose";
import EyeOpenSvg from "../../images/modalIcons/EyeOpenSvg";
import EyeCloseSvg from "../../images/modalIcons/EyeCloseSvg";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { setUser } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const schema = yup.object({
  name: yup
    .string()
    .max(32, "The name must contain a maximum of 32 characters")
    .required("The name is required"),
  email: yup
    .string()
    .email("Please write a valid email")
    .matches(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
      "Please write a valid email"
    )
    .required("The email is required"),
  password: yup
    .string()
    .min(6, "The password must contain a minimum of 6 characters")
    .required("The password is required"),
});

export const RegisterForm = ({ close }) => {
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function onSubmit({ email, password, name }) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password, name)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          dispatch(
            setUser({
              user: {
                email: user.email,
                id: user.uid,
                name: user.displayName,
              },
              token: user.accessToken,
            })
          );
        });
        close();
        toast.success(`Welcome`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  }

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
        <button className={s.closeButton} onClick={close}>
          <SvgClose />
        </button>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.info}>
            <h1 className={s.formTitle}>Registration</h1>
            <p className={s.formText}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <div className={s.inputBlockWrap}>
            <label className={s.inputWrap}>
              <input
                className={s.input}
                placeholder="Name"
                type="text"
                {...register("name")}
              />
              <span className={s.error}>{errors.name?.message}</span>
            </label>
            <label className={s.inputWrap}>
              <input
                className={s.input}
                placeholder="Email"
                type="text"
                {...register("email")}
              />
              <span className={s.error}>{errors.email?.message}</span>
            </label>
            <label className={s.inputWrap}>
              <input
                className={s.input}
                placeholder="Password"
                type={eye ? "text" : "password"}
                {...register("password")}
              />
              <span className={s.error}>{errors.password?.message}</span>
              <button
                className={s.eyeBtn}
                type="button"
                onClick={() => setEye(!eye)}
              >
                {eye ? <EyeOpenSvg /> : <EyeCloseSvg />}
              </button>
            </label>
          </div>

          <button name="submit" className={s.submit} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
