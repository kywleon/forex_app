import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelector({ selectedDate, onDateChange }) {
  return (
    <div className="row mb-4 align-items-center">
      <div className="col text-start">
        <b>
          Rates as of {selectedDate.getFullYear()}-
          {String(selectedDate.getMonth() + 1).padStart(2, "0")}-
          {String(selectedDate.getDate()).padStart(2, "0")}
        </b>
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
