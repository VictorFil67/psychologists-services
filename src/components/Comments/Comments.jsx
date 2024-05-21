import s from "./Comments.module.css";
// import unknown from "../../images/psychologistCard/unknown.png";
import SvgStar from "../../images/psychologistCard/SvgStar";
import { Appointment } from "../Appointment/Appointment";
import { useEffect, useState } from "react";

export const Comments = ({ reviews, name, avatar_url }) => {
  const [modal, setModal] = useState(false);

  function open() {
    setModal(true);
  }
  function close() {
    setModal(false);
  }

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <>
      {modal && (
        <Appointment close={close} name={name} avatar_url={avatar_url} />
      )}
      <ul className={s.commentList}>
        {reviews.map(({ comment, rating, reviewer }, idx) => (
          <li key={idx}>
            <div className={s.reviewer}>
              {/* <img className={s.reviewerImg} src={unknown} alt={reviewer} /> */}
              <div className={s.avatar}>
                <span className={s.letter}>{reviewer.slice(0, 1)}</span>
              </div>
              <div>
                <h4 className={s.name}>{reviewer}</h4>
                <p className={s.rating}>
                  <SvgStar />
                  {rating}
                </p>
              </div>
            </div>
            <p className={s.comment}>{comment}</p>
          </li>
        ))}
      </ul>
      <button className={s.appointment} onClick={open}>
        Make an appointment
      </button>
    </>
  );
};
