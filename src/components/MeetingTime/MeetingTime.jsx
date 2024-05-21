import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersActionBar } from "@mui/x-date-pickers/PickersActionBar";
import dayjs from "dayjs";

const CustomActionBar = (props) => {
  //   const { onAccept, onCancel } = props;

  return <PickersActionBar {...props} actions={["cancel"]} />;
};

export const BasicTimePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        defaultValue={dayjs("2022-04-17T00:00")}
        format="HH:mm"
        ampm={false}
        components={{
          ActionBar: CustomActionBar,
        }}
      />
    </LocalizationProvider>
  );
};
