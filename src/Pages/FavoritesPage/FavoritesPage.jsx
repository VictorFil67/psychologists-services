import { useDispatch, useSelector } from "react-redux";
import { Filters } from "../../components/Filters/Filters";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Psychologists } from "../../components/Psychologists/Psychologists";
import {
  selectFavorites,
  // selectFavorites,
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
import { Loader } from "../../components/Loader/Loader";

export const FavoritesPage = ({ location, setCount, countFavorites }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favoritesPage = useSelector(selectfavoritesPage);
  const favoritesPsychologists = useSelector(selectfavoritesPsychologists);
  const favoritesShow = useSelector(selectfavoritesShow);
  const favorites = useSelector(selectFavorites);
  // const favorites = useSelector(selectFavorites);
  // const [countFavorites, setCountFavorites] = useState(favorites.length);
  const limit = 3;

  const prevSelectedOption = usePrevios(selectedOption);
  const prev = prevSelectedOption?.value;
  const now = selectedOption?.value;

  const prevLocation = usePrevios(location);
  const prevCountFavorites = usePrevios(countFavorites);

  // const setCount = () => {
  //   setCountFavorites(favorites.length);
  // };
  useEffect(() => {
    favoritesPsychologists.length === 0 && favorites.length > 0
      ? setLoading(true)
      : setLoading(false);
  }, [favoritesPsychologists, favorites]);

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
    if (favoritesPage === 0 || prevCountFavorites !== countFavorites) {
      onValue(currentQuery, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data.length) {
          dispatch(setFavorites(data));
        }
        console.log(prevCountFavorites, countFavorites);
        console.log("getData end");
      });
    }
  }, [dispatch, favoritesPage, prevCountFavorites, countFavorites]);

  const getSortedData = useCallback(() => {
    const database = getDatabase();
    const dbRef = ref(database);
    const sortedData = [];
    console.log(prev + "==>" + now);
    if (
      (prev !== now && prevLocation === location) ||
      prevCountFavorites !== countFavorites
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
        dispatch(setFavorites(sortedData));
      });
    }
  }, [
    dispatch,
    selectedOption,
    prev,
    now,
    prevLocation,
    location,
    prevCountFavorites,
    countFavorites,
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
    if (favoritesPsychologists.length && prevLocation === location) {
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
    prevLocation,
    location,
    // selectedOption,
    // prevSelectedOption,
  ]);

  return (
    <>
      {loading && <Loader />}
      <Filters
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Psychologists
        location={location}
        setCountFavorites={setCount}
        // countFavorites={countFavorites}
      />
      <LoadMore location={location} />
    </>
  );
};
