import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelector({ selectedDate, onDateChange }) {
  return (
    <div className="row mb-4 align-items-center">
      <div className="col text-start">
        <b>Rates as of {selectedDate.toISOString().split("T")[0]}</b>
      </div>
      <div className="col text-end">
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          className="form-control"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
}
