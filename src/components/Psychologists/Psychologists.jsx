// import { getDatabase, onValue, ref } from "firebase/database";
// import { firebaseApp } from "../../firebase";
// import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectFavorites,
  selectPsychologists,
  selectfavoritesShow,
} from "../../store/psychologists/selectors";
import { PsychologistCard } from "../PsychologistCard/PsychologistCard";
import s from "./Psychologists.module.css";

export const Psychologists = ({
  location,
  setCountFavorites,
  // countFavorites,
}) => {
  const psychologists = useSelector(selectPsychologists);
  const favoritesShow = useSelector(selectfavoritesShow);
  const favorites = useSelector(selectFavorites);

  console.log(location);
  // const [dataDb, setDataDb] = useState([]);

  // const getData = useCallback(() => {
  //   const database = getDatabase();
  //   const dbRef = ref(database);
  //   onValue(dbRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setDataDb(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);
  // console.log(dataDb);

  //   // const database = getDatabase(firebaseApp);
  //   // const dbRef = ref(database);
  //   // const dispatch = useDispatch();
  //   // const psychologists = useSelector(selectPsychologists);
  //   // console.log(psychologists);
  //   const [data, setData] = useState([]);

  //   const getData = useCallback(() => {
  //     // console.log(psychologists.length);
  //     const database = getDatabase(firebaseApp);
  //     const dbRef = ref(database);
  //     onValue(dbRef, (snapshot) => {
  //       const data = snapshot.val();
  //       setData(data);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     getData();
  //   }, [getData]);
  //   console.log(data);

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
                // countFavorites={countFavorites}
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
