import { useSelector } from "react-redux";
import {
  selectFavorites,
  selectPsychologists,
  selectfavoritesShow,
} from "../../store/psychologists/selectors";
import { PsychologistCard } from "../PsychologistCard/PsychologistCard";
import s from "./Psychologists.module.css";

export const Psychologists = ({ location, setCountFavorites }) => {
  const psychologists = useSelector(selectPsychologists);
  const favoritesShow = useSelector(selectfavoritesShow);
  const favorites = useSelector(selectFavorites);

  return (
    <>
      {location === "/favorites" ? (
        favorites.length ? (
          <ul className={s.psychologistsList}>
            {favoritesShow.map((item, idx) => (
              <PsychologistCard
                key={idx}
                data={item}
                {...item}
                setCountFavorites={setCountFavorites}
              />
            ))}
          </ul>
        ) : (
          <div className={s.messageWrap}>
            <h1 className={s.message}>
              You don`t have any favorite psychologists
            </h1>
          </div>
        )
      ) : (
        <ul className={s.psychologistsList}>
          {psychologists.map((item, idx) => (
            <PsychologistCard
              key={idx}
              data={item}
              {...item}
              setCountFavorites={setCountFavorites}
            />
          ))}
        </ul>
      )}
    </>
  );
};
