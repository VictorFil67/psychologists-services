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
          components={{
            IndicatorSeparator: () => null,
          }}
          placeholder="A to Z"
          styles={{
            control: (b, s) => ({
              ...b,
              borderRadius: "14px",

              boxShadow: s.isFocused ? "var(--green)" : "var(--green)",
              // padding: "16px 162px 16px 18px",
              width: "226px",
              height: "48px",
              cursor: "pointer",
              backgroundColor: "var(--green)",
              borderColor: "var(--light-green)",
              ":hover": {
                borderColor: "var(--green)",
              },
              caretColor: "transparent",
            }),
            singleValue: (b) => ({
              ...b,
              color: "var(--white)",
            }),
            dropdownIndicator: (b, s) => ({
              ...b,
              color: s.isFocused ? "var(--white)" : "var(--white)",
              transform: s.isFocused ? "rotate(0deg)" : "rotate(180deg)",
              ":hover": {
                color: "var(--white)",
                transform: "rotate(0deg)",
              },
              ":active": {
                transform: "rotate(0deg)",
              },
              // },
            }),
            option: (b, s) => ({
              ...b,
              color: !s.isSelected ? "rgba(25, 26, 21, 0.3)" : "var(--black)",
              backgroundColor: s.isFocused
                ? "rgba(84, 190, 150, 0.2)"
                : "var(--white)",
              boxShadow: s.isFocused
                ? "rgba(84, 190, 150, 0.2)"
                : "var(--white)",
              cursor: "pointer",

              ":active": {
                backgroundColor: s.isSelected
                  ? "rgba(84, 190, 150, 0.2)"
                  : "rgba(84, 190, 150, 0.2)",
              },
            }),
            menu: (styles) => ({
              ...styles,
              borderRadius: "14px",
              ":active": {
                dropdownIndicator: (b) => ({
                  ...b,
                  transform: "rotate(180deg)",
                }),
              },
            }),
            placeholder: (defaultStyles) => ({
              ...defaultStyles,
              color: "var(--white)",
            }),
            menuList: (styles) => ({
              ...styles,
              borderRadius: "14px",
              color: "var(--white)",
              ":active": {
                dropdownIndicator: (b) => ({
                  ...b,
                  transform: "rotate(180deg)",
                }),
              },

              // "::-webkit-scrollbar": {
              //   width: "8px",
              // },
              // "::-webkit-scrollbar-track": {
              //   borderRadius: "10px",

              //   background: "rgba(255, 255, 255, 0.05)",
              // },
              // "::-webkit-scrollbar-thumb": {
              //   borderRadius: "10px",

              //   background: "rgba(18, 20, 23, 0.05)",
              // },
              // "::-webkit-scrollbar-thumb:hover": {
              //   borderRadius: "10px",

              //   background: "rgba(7, 8, 9, 0.05)",
              // },
            }),
          }}
        />
      </label>
    </div>
  );
};
