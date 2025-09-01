import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import currencyRoutes from "./routes/currencyRoutes.js";
import ratesRoutes from "./routes/ratesRoutes.js";
import getExchangeRate from "./routes/externalRate.js";
import rateRoute from "./routes/rates.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use("/api/exchange-rates", getExchangeRate);

app.use("/api/rates", ratesRoutes);

app.use("/api/currencies", currencyRoutes);

app.use("/api/rates", rateRoute);

sequelize.sync().then(() => {
  console.log("Database synced");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;