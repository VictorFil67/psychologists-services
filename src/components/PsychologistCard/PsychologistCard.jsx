import { useState } from "react";
import SvgHeart from "../../images/psychologistCard/SvgHeart";
import SvgOnline from "../../images/psychologistCard/SvgOnline";
import SvgStar from "../../images/psychologistCard/SvgStar";
import s from "./PsychologistCard.module.css";

export const PsychologistCard = ({
  about,
  avatar_url,
  experience,
  initial_consultation,
  license,
  name,
  price_per_hour,
  rating,
  // id,
  // reviews,
  specialization,
}) => {
  const [readMore, setReadMore] = useState(false);
  // const showMore = () => {
  //   setReadMore(true);
  // };

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
                <button className={s.heart}>
                  <SvgHeart />
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
            <div className={s.readMore}></div>
          )}
        </div>
      </li>
    </>
  );
};
