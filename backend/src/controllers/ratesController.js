import Rate from "../models/Rate.js";
import Currency from "../models/Currency.js";
import { getRates } from "../services/rateService.js";

export const getLatestRates = async (req, res) => {
  try {
    const data = await getRates();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRatesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const data = await getRates(date);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.findAll();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRate = async (req, res) => {
  try {
    const rates = await Rate.findAll();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
