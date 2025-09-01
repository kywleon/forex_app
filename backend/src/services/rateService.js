import Rate from "../models/Rate.js";
import Currency from "../models/Currency.js";

export const getRates = async (date = null) => {
  // Accept only '2025-08-25' format or string 'latest'
  if (date && date !== "latest") {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return {
        date: null,
        rates: [],
        message: "Invalid date format. Expected YYYY-MM-DD or 'latest'.",
      };
    }
    // Further check if it's a valid calendar date
    const parsedDate = new Date(date);
    const [year, month, day] = date.split('-').map(Number);
    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() + 1 !== month ||
      parsedDate.getDate() !== day
    ) {
      return {
        date: null,
        rates: [],
        message: "Invalid date format. Expected YYYY-MM-DD or 'latest'.",
      };
    }

    // Check if date is today or in the future
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const searchDate = new Date(year, month - 1, day);

    if (searchDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      return {
        date: null,
        rates: [],
        message: `You can only query rates before ${yesterday.toISOString().slice(0,10)}. Today's and future rates are not available.`,
      };
    }
  }

  // If date is not passed, the latest
  const targetDate = date || await Rate.max("effective_date");

  if (!targetDate) {
    return {
      date: null,
      rates: [],
      message: "No rate data available in database",
    };
  }

  // Check if the currencies table has data
  const currencyCount = await Currency.count();
  if (currencyCount === 0) {
    return {
      date: targetDate,
      rates: [],
      message: "No currencies available in database",
    };
  }

  // Query the exchange rate for the date, taking only the required fields
  const rates = await Rate.findAll({
    where: { effective_date: targetDate },
    include: [
      {
        model: Currency,
        as: "targetCurrency",
        attributes: ["code"],
      },
    ],
    attributes: ["rate"],
  });

  if (rates.length === 0) {
    return {
      date: targetDate,
      rates: [],
      message: `No currencies rate found for date ${targetDate}`,
    };
  }

  const formattedRates = rates.map((r) => ({
    code: r.targetCurrency.code,
    rate: r.rate,
  }));

  return {
    date: targetDate,
    rates: formattedRates,
  };
};
