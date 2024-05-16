import { Filters } from "../../components/Filters/Filters";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { Psychologists } from "../../components/Psychologists/Psychologists";

export const FavoritesPage = () => {
  return (
    <>
      <Filters
      // selectedOption={selectedOption}
      // setSelectedOption={setSelectedOption}
      />
      <Psychologists />
      <LoadMore />
    </>
  );
};
