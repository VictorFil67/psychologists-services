import { useDispatch, useSelector } from "react-redux";
import { Filters } from "../../components/Filters/Filters";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Psychologists } from "../../components/Psychologists/Psychologists";
import {
  selectfavoritesPage,
  selectfavoritesPsychologists,
  selectfavoritesShow,
} from "../../store/psychologists/selectors";
import { useCallback, useEffect, useState } from "react";
import { usePrevios } from "../../hooks/usePrevios";
import {
  setFavorites,
  setFavoritesCurrentState,
  setFavoritesShow,
} from "../../store/psychologists/psychologistsSlice";
import {
  getDatabase,
  onValue,
  orderByChild,
  orderByKey,
  query,
  ref,
} from "firebase/database";

export const FavoritesPage = ({ location }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const favoritesPage = useSelector(selectfavoritesPage);
  const favoritesPsychologists = useSelector(selectfavoritesPsychologists);
  const favoritesShow = useSelector(selectfavoritesShow);
  const limit = 3;

  const prevSelectedOption = usePrevios(selectedOption);
  const prev = prevSelectedOption?.value;
  const now = selectedOption?.value;

  const prevLocation = usePrevios(location);

  useEffect(() => {
    // console.log(prevLocation);
    // console.log(location);
    if (prevLocation !== location) {
      // setSelectedOption(prevSelectedOption);
      const data = { favoritesPsychologists, favoritesShow, favoritesPage };
      dispatch(setFavoritesCurrentState(data));
    }
  }, [
    prevLocation,
    location,
    dispatch,
    favoritesPsychologists,
    favoritesShow,
    favoritesPage,
    prevSelectedOption,
    setSelectedOption,
  ]);

  const getData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);

    // let startItem = String(page * limit - 1);
    // let endItem = String(page * limit + limit - 1);

    const currentQuery = query(
      dbRef,
      orderByKey()
      // startAfter(startItem),
      // endAt(endItem)
    );
    // if (prevLocation !== location && favoritesPage > 0) {
    //   return;
    // } else {
    onValue(currentQuery, (snapshot) => {
      const data = snapshot.val();
      // const newData = snapshot.val();
      // console.log(newData);
      // let data = [];

      // if (Array.isArray(newData)) {
      //   data = newData.splice(newData.length - 3, 3);
      // } else {
      //   data = Object.values(newData);
      // }
      // console.log(newData);
      console.log(data);
      if (data.length) {
        dispatch(setFavorites(data));
      }
      console.log("getData end");
    });
    // }
  }, [
    dispatch,
    // , favoritesPage, location, prevLocation
  ]);

  const getSortedData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);
    const sortedData = [];
    // console.log(prev + "==>" + now);
    // if (favoritesPsychologists.length !== 0 && prev === undefined) {
    //   return;
    // } else if (
    //   favoritesPsychologists.length === 0 ||
    //   prev !== now
    //   //  ||
    //   // (sorted.length !== 0 && prev && prev !== now)
    // ) {
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
      dispatch(setFavorites(sortedData));
    });
    // }
  }, [
    dispatch,
    selectedOption,
    // , favoritesPsychologists, prev, now
  ]);

  useEffect(() => {
    selectedOption ? getSortedData() : getData();
  }, [getData, getSortedData, selectedOption]);

  useEffect(() => {
    // console.log(prevLocation);
    // console.log(location);
    // console.log(page);
    // if (prevLocation !== location && favoritesPage > 0) {
    //   return;
    // } else {
    if (favoritesPsychologists.length) {
      const data = favoritesPsychologists.slice(
        favoritesPage * limit,
        favoritesPage * limit + limit
      );
      dispatch(setFavoritesShow(data));
    }
    // }
    // console.log(selectedOption, prevSelectedOption);
  }, [
    favoritesPsychologists,
    favoritesPage,
    dispatch,
    // prevLocation,
    // location,
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
