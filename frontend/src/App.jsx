import { useEffect, useState } from "react";
import api from "./api";

import DateSelector from "./components/DateSelector";
import RatesGrid from "./components/RatesGrid";
import Loading from "./components/Loading";

function App() {
  const [rates, setRates] = useState({ date: "", rates: [], message: "" });
  const [visibleRates, setVisibleRates] = useState([]); // Currently displayed section
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getYesterday()); // default to yesterday
  const [itemsToShow, setItemsToShow] = useState(12); // Quantity per load

  function getYesterday() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0);
    return today;
  }

  const fetchRates = (date) => {
    setLoading(true);
    // Format the date using local time to avoid time zone issues
    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    api
      .getRatesByDate(formattedDate)
      .then((data) => {
        setRates(data);
        setItemsToShow(12); // Reset pagination
        setVisibleRates(data.rates.slice(0, 12));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 50
      ) {
        // Show 12 more at a time
        setItemsToShow((prev) => prev + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When itemsToShow changes, update visibleRates
  useEffect(() => {
    if (rates.rates.length > 0) {
      setVisibleRates(rates.rates.slice(0, itemsToShow));
    }
  }, [itemsToShow, rates]);

  useEffect(() => {
    fetchRates(selectedDate);
  }, [selectedDate]);

  return (
    <div className="container-fluid">
      <div className="row py-4">
        <h1 className="mb-4 text-center">💱 Exchange Rates</h1>
      </div>
      <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      {loading ? (
        <Loading />
      ) : (
        <div className="row g-3">
          <RatesGrid rates={visibleRates} message={rates.message} />
        </div>
      )}
    </div>
  );
}

export default App;
