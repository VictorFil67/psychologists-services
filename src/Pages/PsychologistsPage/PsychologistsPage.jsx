import { Psychologists } from "../../components/Psychologists/Psychologists";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Filters } from "../../components/Filters/Filters";
import { useCallback, useEffect } from "react";
import {
  endAt,
  getDatabase,
  // limitToFirst,
  // limitToLast,
  onValue,
  // orderByChild,
  orderByKey,
  // orderByValue,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
// import { selectPsychologists } from "../../store/psychologists/selectors";
import { setPsychologists } from "../../store/psychologists/psychologistsSlice";
import {
  selectPage,
  // selectPsychologists,
} from "../../store/psychologists/selectors";

export const PsychologistsPage = () => {
  // const [dataDb, setDataDb] = useState([]);
  const dispatch = useDispatch();
  const { page } = useSelector(selectPage);
  // console.log(psychologists);

  // you can use both options: this one or the second one
  const getData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);
    let startPage;
    let endPage;

    if (page === 3) {
      startPage = String(-1);
      endPage = String(2);
      console.log(startPage);
    } else {
      startPage = String(page - 3);
      endPage = String(page);
    }
    const currentQuery = query(
      dbRef,
      orderByKey(),
      startAfter(startPage),
      endAt(endPage)
    );
    onValue(currentQuery, (snapshot) => {
      // const data = snapshot.val();
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(`${childKey} : ${childData.experience}`);
      });
      // console.log(data);
    });

    onValue(currentQuery, (snapshot) => {
      const newData = snapshot.val();
      let data = [];
      let keys = [];

      if (Array.isArray(newData)) {
        data = newData.splice(newData.length - 3, 3);
      } else {
        // Object.keys(newData).forEach(data.push() )
        data = Object.values(newData);

        keys = Object.keys(newData);
      }
      console.log(newData);
      console.log(data);
      console.log(keys);
      // setDataDb(data);
      dispatch(setPsychologists(data));
      console.log("first");
    });
  }, [dispatch, page]);

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
