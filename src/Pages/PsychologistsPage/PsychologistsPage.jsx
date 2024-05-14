import { Psychologists } from "../../components/Psychologists/Psychologists";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Filters } from "../../components/Filters/Filters";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  endAt,
  getDatabase,
  onValue,
  orderByChild,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import {
  setPsychologists,
  setSorted,
} from "../../store/psychologists/psychologistsSlice";
import { selectPage, selectSorted } from "../../store/psychologists/selectors";

export const PsychologistsPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const sorted = useSelector(selectSorted);
  // const selected = 1;
  const limit = 3;

  const prevSelectedOptionRef = useRef();
  useEffect(() => {
    prevSelectedOptionRef.current = selectedOption;
    console.log("useRef worked in useEffect");
  });
  const prevSelectedOption = prevSelectedOptionRef.current;
  const prev = prevSelectedOption?.value;
  const now = selectedOption?.value;
  console.log(`${prev} => ${now}`);

  // you can use both options: this one or the second one
  const getData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);

    let startItem = String(page * limit - 1);
    let endItem = String(page * limit + limit - 1);

    const currentQuery = query(
      dbRef,
      orderByKey(),
      startAfter(startItem),
      endAt(endItem)
    );
    onValue(currentQuery, (snapshot) => {
      const newData = snapshot.val();
      console.log(newData);
      let data = [];

      if (Array.isArray(newData)) {
        data = newData.splice(newData.length - 3, 3);
      } else {
        data = Object.values(newData);
      }
      console.log(newData);
      console.log(data);

      dispatch(setPsychologists(data));
      console.log("getData end");
    });
  }, [dispatch, page]);
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

  const getSortedData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);
    const sortedData = [];

    if (sorted.length === 0 || prev !== now) {
      const selectedValue = Object.values(selectedOption)[0].split(" ")[0];
      const selectedOrder = Object.values(selectedOption)[0].split(" ")[1];
      console.log(selectedOrder);
      const currentQuery = query(dbRef, orderByChild(selectedValue));
      onValue(currentQuery, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          console.log(`${childKey} : ${childData[selectedValue]}`);
          sortedData.push(childData);
        });

        if (selectedOrder) {
          sortedData.reverse();
        }
        console.log(sortedData);
        dispatch(setSorted(sortedData));
      });
    }
  }, [dispatch, sorted, selectedOption, prev, now]);

  useEffect(() => {
    selectedOption ? getSortedData() : getData();
  }, [getData, getSortedData, selectedOption]);

  useEffect(() => {
    console.log(sorted);
    console.log(page);
    const data = sorted.slice(page * limit, page * limit + limit);
    console.log(data);
    dispatch(setPsychologists(data));
  }, [sorted, page, dispatch]);

  return (
    <>
      <Filters
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Psychologists />
      <LoadMore />
    </>
  );
};