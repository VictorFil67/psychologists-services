import { useForm } from "react-hook-form";
import SvgClose from "../../images/modalIcons/SvgClose";
import s from "./Appointment.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useMask } from "@react-input/mask";

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
  tel: yup
    .string()
    // .mask("+380 (__) ___-__-__"),
    .min(12, "The phone must contain a minimum of 12 characters"),
  // .required("The phone is required"),
  time: yup
    .string()
    .notOneOf(["00:00"], "Please specify the time")
    .required("The time is required"),
  comment: yup.string().required("The comment is required"),
});

export const Appointment = ({ close, name, avatar_url }) => {
  const [value, setValue] = useState("00:00");
  const [tel, setTel] = useState("+380");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    console.log(inputRef);
    alert(`You made the appointment with ${name} at ${data.time}`);
  }

  const inputRef = useMask({
    mask: "+380 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      close();
    }
  }
  document.addEventListener("keydown", onWindowEscape);
  function onWindowEscape(e) {
    if (e.code === "Escape") {
      close();
      document.removeEventListener("keydown", onWindowEscape);
    }
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleChangeTel(e) {
    setTel(e.target.value);
  }

  return (
    <div className={s.overlay} onClick={handleClick}>
      <div className={s.modal}>
        <button className={s.CloseBtn} onClick={close} aria-label="close">
          <SvgClose />
        </button>
        <h2 className={s.title} data-appointment="">
          Make an appointment with a psychologists
        </h2>
        <p className={s.text} data-appointment="">
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div className={s.psychologistwrap}>
          <img
            className={s.psychologistImg}
            src={avatar_url}
            alt={name}
            width="44"
            height="44"
          />
          <div className={s.psychologistInfo}>
            <p className={s.yourPsychologist}>Your psychologists</p>
            <h3 className={s.name}>{name}</h3>
          </div>
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputBox}>
            <input
              className={s.input}
              {...register("name")}
              type="text"
              placeholder="Name"
            />
            <span className={s.error}>{errors.name?.message}</span>
          </div>
          <div className={s.box}>
            <div className={s.inputBox}>
              <input
                className={s.input}
                {...register("tel")}
                type="text"
                placeholder="+380"
                ref={inputRef}
                value={tel}
                onChange={handleChangeTel}
              />
              <span className={s.error}>{errors.tel?.message}</span>
            </div>
            <div className={s.inputBox}>
              <input
                className={s.input + " " + s.time}
                {...register("time")}
                type="time"
                placeholder=""
                value={value}
                onChange={handleChange}
              />
              <span className={s.error}>{errors.time?.message}</span>
            </div>
          </div>
          <div className={s.inputBox}>
            <input
              className={s.input}
              {...register("email")}
              type="text"
              placeholder="Email"
            />
            <span className={s.error}>{errors.email?.message}</span>
          </div>
          <div className={s.inputBox}>
            <textarea
              className={s.textarea}
              {...register("comment")}
              placeholder="Comment"
            ></textarea>
            <span className={s.error}>{errors.comment?.message}</span>
          </div>
          <button className={s.button} type="submit" aria-label="Send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
