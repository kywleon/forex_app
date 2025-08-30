import Rate from "../models/Rate.js";
import Currency from "../models/Currency.js";

export const getRates = async (date = null) => {
  // 如果没传 date，就取最新
  const targetDate = date || await Rate.max("effective_date");

  if (!targetDate) {
    return {
      date: null,
      rates: [],
      message: "No rate data available in database",
    };
  }

  // 检查 currencies 表是否有数据
  const currencyCount = await Currency.count();
  if (currencyCount === 0) {
    return {
      date: targetDate,
      rates: [],
      message: "No currencies available in database",
    };
  }

  // 查询该日期的汇率，只取需要的字段
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
