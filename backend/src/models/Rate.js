import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Currency from "./Currency.js";

const Rate = sequelize.define(
  "Rate",
  {
    rate: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: false,
    },
    effective_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "rates",
    timestamps: false,
  }
);

Rate.belongsTo(Currency, {
  as: "baseCurrency",
  foreignKey: "base_currency_id",
});

Rate.belongsTo(Currency, {
  as: "targetCurrency",
  foreignKey: "target_currency_id",
});

export default Rate;
