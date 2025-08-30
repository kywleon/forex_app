import Rate from "../models/Rate.js";
import Currency from "../models/Currency.js";
import axios from "axios";

export const getExchangeRates = async (req, res) => {
  try {
    const { currencies, date , base_currency = null } = req.query;

    const apiKey = process.env.CURRENCY_API_KEY;

    console.log(currencies);
    console.log(date);
    console.log(base_currency);

    const response = await axios.get(`https://api.currencyapi.com/v3/historical?apikey=${apiKey}&currencies=${currencies}&date=${date}`);
    
    const data = response.data;

    const rates = data.data;

    for (const [currency, info] of Object.entries(rates)) {
      console.log("Currency:", info.code, "Rate:", info.value);

      // 找到 target currency
      const targetCurrency = await Currency.findOne({
        where: { code: info.code },
        attributes: ["id"],
        raw: true,
      });

      if (!targetCurrency) {
        console.log("⚠️ Currency not found in DB:", info.code);
        continue;
      }

      // 插入 rate 记录
      await Rate.create({
        base_currency_id: 1, // 假设 1 = USD
        target_currency_id: targetCurrency.id,
        rate: info.value,
        effective_date: date,
      });

      console.log(`✅ Inserted rate for ${info.code}`);
    }

    res.json({ message: "Exchange rates inserted successfully" });

  } catch (error) {
    console.error("❌ Error inserting exchange rates:", error);
    res.status(500).json({ error: "Failed to insert exchange rates" });
  }
};
