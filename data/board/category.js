import {sequelize} from "../../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const Category = sequelize.define(
    "category",
    {
        id: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DateTypes.STRING(30),
            allowNull: false,
        },
        post_num: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
            unique: true,
        },
    },
    {timestamps: false, tableName: "category", charset: "utf8", collate: "utf8_general_ci"}
);
