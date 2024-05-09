import { Psychologists } from "../../components/Psychologists/Psychologists";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Filters } from "../../components/Filters/Filters";
import { useCallback, useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

export const PsychologistsPage = () => {
  const [dataDb, setDataDb] = useState([]);
  const getData = useCallback(() => {
    // console.log(psychologists.length);
    const database = getDatabase();
    const dbRef = ref(database);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setDataDb(data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  console.log(dataDb);
  return (
    <>
      <Filters />
      <Psychologists psychologists={dataDb} />
      <LoadMore />
    </>
  );
};
