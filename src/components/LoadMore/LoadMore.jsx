import { useDispatch, useSelector } from "react-redux";
import s from "./LoadMore.module.css";
import { handleLoadMore } from "../../store/psychologists/psychologistsSlice";
import { selectPsychologists } from "../../store/psychologists/selectors";

export const LoadMore = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);

  return (
    <div className={s.loadMoreWrap}>
      {psychologists.length % 3 === 0 && (
        <button
          className={s.loadMore}
          onClick={() => dispatch(handleLoadMore())}
        >
          LoadMore
        </button>
      )}
    </div>
  );
};
