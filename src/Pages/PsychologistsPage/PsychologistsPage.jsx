import { Psychologists } from "../../components/Psychologists/Psychologists";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Filters } from "../../components/Filters/Filters";
import { useCallback, useEffect } from "react";
import {
  getDatabase,
  limitToFirst,
  limitToLast,
  onValue,
  query,
  ref,
} from "firebase/database";
import { useDispatch } from "react-redux";
// import { selectPsychologists } from "../../store/psychologists/selectors";
import { setPsychologists } from "../../store/psychologists/psychologistsSlice";

export const PsychologistsPage = () => {
  // const [dataDb, setDataDb] = useState([]);
  const dispatch = useDispatch();

  // you can use both options: this one or the second one
  const getData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);

    const last = query(dbRef, limitToFirst(100));
    onValue(last, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      // setDataDb(data);
      dispatch(setPsychologists(data));
      console.log("first");
    });
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  // the second one
  // useEffect(() => {
  //   const getData = () => {
  //     const database = getDatabase();
  //     const dbRef = ref(database);
  //     onValue(dbRef, (snapshot) => {
  //       const data = snapshot.val();
  //       setDataDb(data);
  //     });
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <Filters />
      <Psychologists
      //  psychologists={dataDb}
      />
      <LoadMore />
    </>
  );
};
