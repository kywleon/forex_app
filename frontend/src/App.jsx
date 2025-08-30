import { useEffect, useState } from "react";
import api from "./api";

import DateSelector from "./components/DateSelector";
import RatesGrid from "./components/RatesGrid";
import Loading from "./components/Loading";

function App() {
  const [rates, setRates] = useState({ date: "", rates: [], message: "" });
  const [visibleRates, setVisibleRates] = useState([]); // Currently displayed section
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date("2025-08-27"));
  const [itemsToShow, setItemsToShow] = useState(12); // Quantity per load

  const fetchRates = (date) => {
    setLoading(true);
    const formattedDate = date.toISOString().split("T")[0];
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
          <RatesGrid rates={visibleRates} />
        </div>
      )}
    </div>
  );
}

export default App;
