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
import { Loader } from "../../components/Loader/Loader";

const PsychologistsPage = ({ location, setCount }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const psychologists = useSelector(selectPsychologists);
  const sorted = useSelector(selectSorted);
  const limit = 3;

  useEffect(() => {
    psychologists.length === 0 ? setLoading(true) : setLoading(false);
  }, [psychologists]);

  const prevSelectedOption = usePrevios(selectedOption);
  const prev = prevSelectedOption?.value;
  const now = selectedOption?.value;

  const prevLocation = usePrevios(location);

  useEffect(() => {
    if (prevLocation !== location) {
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
        let data = [];

        if (Array.isArray(newData)) {
          data = newData.splice(newData.length - 3, 3);
        } else {
          data = Object.values(newData);
        }
        if (data.length) {
          dispatch(setPsychologists(data));
        }
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

    if (sorted.length !== 0 && prev === undefined) {
      return;
    } else if (sorted.length === 0 || prev !== now) {
      const selectedValue = Object.values(selectedOption)[0].split(" ")[0];
      const selectedOrder = Object.values(selectedOption)[0].split(" ")[1];
      const currentQuery = query(dbRef, orderByChild(selectedValue));

      onValue(currentQuery, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          sortedData.push(childData);
        });

        if (selectedOrder) {
          sortedData.reverse();
        }
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
    if (prevLocation !== location && page > 0) {
      return;
    } else {
      if (sorted.length) {
        const data = sorted.slice(page * limit, page * limit + limit);
        dispatch(setPsychologists(data));
      }
    }
  }, [sorted, page, dispatch, prevLocation, location]);

  return (
    <>
      {loading && <Loader />}
      <Filters
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Psychologists location={location} setCountFavorites={setCount} />
      <LoadMore location={location} />
    </>
  );
};

export default PsychologistsPage;
