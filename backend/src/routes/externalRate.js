import express from "express";
import { getExchangeRates } from "../controllers/getExchangeRate.js";

const router = express.Router();

router.get("/", getExchangeRates);

export default router;