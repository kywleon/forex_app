import express from "express";
import {
  getLatestRates,
  getRatesByDate,
} from "../controllers/ratesController.js";

const router = express.Router();

router.get("/latest", getLatestRates);
router.get("/:date", getRatesByDate);

export default router;
