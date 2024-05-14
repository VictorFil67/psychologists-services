import Select from "react-select";

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
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
};
