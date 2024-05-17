import { useState } from "react";
import SvgHeart from "../../images/psychologistCard/SvgHeart";
import SvgOnline from "../../images/psychologistCard/SvgOnline";
import SvgStar from "../../images/psychologistCard/SvgStar";
import s from "./PsychologistCard.module.css";
import { Comments } from "../Comments/Comments";
import { toggleHeart } from "../../store/psychologists/psychologistsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../store/psychologists/selectors";
import { selectUser } from "../../store/auth/selectors";
import { NoAccess } from "../NoAccess/NoAccess";

export const PsychologistCard = ({
  about,
  avatar_url,
  experience,
  initial_consultation,
  license,
  name,
  price_per_hour,
  rating,
  reviews,
  specialization,
  setCountFavorites,
  // countFavorites,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const heart = favorites.includes(avatar_url);
  const user = useSelector(selectUser);

  function open() {
    setModal(true);
  }
  function close() {
    setModal(false);
  }

  return (
    <>
      <li className={s.card}>
        <div className={s.cardImgWrap}>
          <SvgOnline className={s.svgOnline} />
          <img className={s.cardImg} src={avatar_url} alt={name} />
        </div>
        <div>
          <div className={s.cardInfo}>
            <p className={s.psychologist}>Psychologist</p>
            <ul className={s.cardInfoList}>
              <li className={s.cardInfoItem}>
                <SvgStar />
                <p className={s.cardInfoText}>
                  Rating: <span>{rating}</span>
                </p>
              </li>
              <li className={s.cardInfoItem}>
                <p className={s.cardInfoText}>
                  Price / 1 hour:{" "}
                  <span className={s.price}>{price_per_hour}$</span>
                </p>
              </li>
              <li className={s.cardInfoItem}>
                <button
                  className={s.heart}
                  onClick={
                    user
                      ? () =>
                          dispatch(toggleHeart(avatar_url)) &&
                          setCountFavorites()
                      : open
                  }
                >
                  <SvgHeart className={heart ? s.svgHeart : ""} />
                </button>
              </li>
            </ul>
          </div>
          <h3 className={s.name}>{name} </h3>
          <div className={s.qualityList}>
            <ul className={s.qualityRow}>
              <li className={s.quality}>
                <p className={s.qualityName}>
                  Experience:
                  <span className={s.qualityText}>{experience}</span>
                </p>
              </li>
              <li className={s.quality}>
                <p className={s.qualityName}>
                  License:
                  <span className={s.qualityText}>{license}</span>
                </p>
              </li>
            </ul>
            <ul className={s.qualityRow}>
              <li className={s.quality}>
                <p className={s.qualityName}>
                  Specialization:
                  <span className={s.qualityText}>{specialization}</span>
                </p>
              </li>
              <li className={s.quality}>
                <p className={s.qualityName}>
                  Initial_consultation:
                  <span className={s.qualityText}>{initial_consultation}</span>
                </p>
              </li>
            </ul>
          </div>
          <p className={s.about}>{about}</p>
          {!readMore ? (
            <button className={s.readMoreButton} onClick={setReadMore}>
              Read more
            </button>
          ) : (
            // <div className={s.readMore}>
            <Comments reviews={reviews} />
            // </div>
          )}
        </div>
      </li>
      {modal && <NoAccess close={close} />}
    </>
  );
};
