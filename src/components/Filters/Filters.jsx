import Select from "react-select";
import s from "./Filters.module.css";

const options = [
  { value: "name", label: "A to Z" },
  { value: "name desc", label: "Z to A" },
  { value: "price_per_hour", label: "Price from the lowest" },
  { value: "price_per_hour desc", label: "Price from the highest" },
  { value: "rating", label: "Popular from the lowest" },
  { value: "rating desc", label: "Popular from the highest" },
  { value: "all", label: "Show all" },
];

export const Filters = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className={s.wrap}>
      <label className={s.label}>
        Filters
        <Select
          className={s.select}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderRadius: "14px",
              // padding: "16px 162px 16px 18px",
              width: "226px",
              height: "48px",
            }),
            // control: (baseStyles, state) => ({
            //   ...baseStyles,
            //   borderColor: state.isFocused ? "grey" : "red",
            // }),
          }}
        />
      </label>
    </div>
  );
};
