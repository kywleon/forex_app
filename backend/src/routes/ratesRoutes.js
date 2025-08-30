import express from "express";
import { getRate } from "../controllers/ratesController.js";

const router = express.Router();

router.get("/", getRate);

export default router;
