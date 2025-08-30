import express from "express";
import { getCurrencies } from "../controllers/ratesController.js";

const router = express.Router();

router.get("/", getCurrencies);

export default router;