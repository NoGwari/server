import {db, sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const Category = sequelize.define(
    "categorie",
    {
        CategoryID: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        CategoryName: {
            type: DateTypes.STRING(30),
            allowNull: false,
        },
        CategoryPostNum: {
            type: DateTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
    },
    {timestamps: false}
);
