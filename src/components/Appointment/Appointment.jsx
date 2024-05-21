import { useForm } from "react-hook-form";
import SvgClose from "../../images/modalIcons/SvgClose";
import s from "./Appointment.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { BasicTimePicker } from "../MeetingTime/MeetingTime";
import { useState } from "react";
// import { Time } from "../Time/Time";
// import BasicTimePicker from "../MeetingTime/MeetingTime";

const schema = yup.object({
  name: yup
    .string()
    // .min(5)
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
    .min(10, "The phone must contain a minimum of 10 characters")
    .required("The phone is required"),
  time: yup
    .string()
    // .min("00:01", "The time must be chosen")
    .required("The time is required"),
  comment: yup
    .string()
    // .max(10, "The comment must contain a maximum of 10 characters")
    .required("The comment is required"),
});

export const Appointment = ({ close, name, avatar_url }) => {
  const [value, setValue] = useState("00:00");

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
    alert(`You made the appointment with ${name} at ${data.time}`);
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
      document.removeEventListener("keydown", onWindowEscape);
    }
  }
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className={s.overlay} onClick={handleClick}>
      <div className={s.modal}>
        <button className={s.CloseBtn} onClick={close}>
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
          <input
            className={s.input}
            {...register("name")}
            type="text"
            placeholder="Name"
            // name="name"
          />
          <span className={s.error}>{errors.name?.message}</span>
          <div className={s.box}>
            <div className={s.inputBox}>
              <input
                className={s.input}
                {...register("tel")}
                type="tel"
                placeholder="+380"
                //   name="tel"
              />
              <span className={s.error}>{errors.tel?.message}</span>
            </div>
            <div className={s.inputBox}>
              <input
                className={s.input}
                {...register("time")}
                type="time"
                placeholder=""
                value={value}
                onChange={handleChange}
              />
              {/* <Time /> */}
              {/* <BasicTimePicker /> */}
              <span className={s.error}>{errors.time?.message}</span>
            </div>
          </div>
          <input
            className={s.input}
            {...register("email")}
            type="text"
            placeholder="Email"
            // name="email"
          />
          <span className={s.error}>{errors.email?.message}</span>
          <textarea
            className={s.textarea}
            {...register("comment")}
            placeholder="Comment"
            // name="comment"
          ></textarea>
          <span className={s.error}>{errors.comment?.message}</span>
          <button className={s.button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
