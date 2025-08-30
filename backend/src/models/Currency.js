import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Currency = sequelize.define(
  "Currency",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "currencies",
    timestamps: false,
  }
);

export default Currency;
