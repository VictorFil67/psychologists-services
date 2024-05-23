import { useDispatch, useSelector } from "react-redux";
import s from "./LoadMore.module.css";
import {
  favoritesHandleLoadMore,
  handleLoadMore,
} from "../../store/psychologists/psychologistsSlice";
import {
  selectPsychologists,
  selectSorted,
  selectfavoritesPsychologists,
  selectfavoritesShow,
} from "../../store/psychologists/selectors";

export const LoadMore = ({ location }) => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const sorted = useSelector(selectSorted);
  const favoritesPsychologists = useSelector(selectfavoritesPsychologists);
  const favoritesShow = useSelector(selectfavoritesShow);

  return (
    <>
      {location === "/psychologists" ? (
        <div className={s.loadMoreWrap}>
          {(psychologists.length % 3 === 0 ||
            psychologists.length !== sorted.length) && (
            <button
              className={s.loadMore}
              onClick={() => dispatch(handleLoadMore())}
              aria-label="Load more"
            >
              Load more
            </button>
          )}
        </div>
      ) : (
        location === "/favorites" && (
          <div className={s.loadMoreWrap}>
            {favoritesShow.length < favoritesPsychologists.length && (
              <button
                className={s.loadMore}
                onClick={() => dispatch(favoritesHandleLoadMore())}
                aria-label="Load more"
              >
                LoadMore
              </button>
            )}
          </div>
        )
      )}
    </>
  );
};
