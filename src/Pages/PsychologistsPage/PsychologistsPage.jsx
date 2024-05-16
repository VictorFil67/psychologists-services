import { Psychologists } from "../../components/Psychologists/Psychologists";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Filters } from "../../components/Filters/Filters";
import { useCallback, useEffect, useState } from "react";
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
  setCurrentState,
  setPsychologists,
  setSorted,
} from "../../store/psychologists/psychologistsSlice";
import {
  selectPage,
  selectPsychologists,
  selectSorted,
} from "../../store/psychologists/selectors";
import { usePrevios } from "../../hooks/usePrevios";

export const PsychologistsPage = ({
  location,
  // selectedOption,
  // setSelectedOption,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const psychologists = useSelector(selectPsychologists);
  const sorted = useSelector(selectSorted);
  const limit = 3;

  //Hook for getting the previous state
  // const usePrevios = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // };
  const prevSelectedOption = usePrevios(selectedOption);
  const prev = prevSelectedOption?.value;
  const now = selectedOption?.value;

  const prevLocation = usePrevios(location);

  useEffect(() => {
    console.log(prevLocation);
    console.log(location);
    if (prevLocation !== location) {
      // setSelectedOption(prevSelectedOption);
      const data = { psychologists, sorted, page };
      dispatch(setCurrentState(data));
    }
  }, [
    prevLocation,
    location,
    dispatch,
    psychologists,
    sorted,
    page,
    prevSelectedOption,
    setSelectedOption,
  ]);

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
    if (prevLocation !== location && page > 0) {
      return;
    } else {
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
        if (data.length) {
          dispatch(setPsychologists(data));
        }
        console.log("getData end");
      });
    }
  }, [dispatch, page, location, prevLocation]);
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
    console.log(prev + "==>" + now);
    if (sorted.length !== 0 && prev === undefined) {
      return;
    } else if (
      sorted.length === 0 ||
      prev !== now
      //  ||
      // (sorted.length !== 0 && prev && prev !== now)
    ) {
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
    if (selectedOption) {
      getSortedData();
    } else if (!selectedOption && !sorted.length) {
      getData();
    }
  }, [getData, getSortedData, selectedOption, sorted]);

  useEffect(() => {
    console.log(prevLocation);
    console.log(location);
    console.log(page);
    if (prevLocation !== location && page > 0) {
      return;
    } else {
      if (sorted.length) {
        const data = sorted.slice(page * limit, page * limit + limit);
        dispatch(setPsychologists(data));
      }
    }
    // console.log(selectedOption, prevSelectedOption);
  }, [
    sorted,
    page,
    dispatch,
    prevLocation,
    location,
    // selectedOption,
    // prevSelectedOption,
  ]);

  return (
    <>
      <Filters
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Psychologists location={location} />
      <LoadMore location={location} />
    </>
  );
};
