// import { getDatabase, onValue, ref } from "firebase/database";
// import { firebaseApp } from "../../firebase";
// import { useCallback, useEffect, useState } from "react";
import { PsychologistCard } from "../PsychologistCard/PsychologistCard";
import s from "./Psychologists.module.css";

export const Psychologists = ({ psychologists }) => {
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
      <ul className={s.psychologistsList}>
        {psychologists.map((item, idx) => (
          <PsychologistCard key={idx} data={item} {...item} />
        ))}
      </ul>
    </>
  );
};
