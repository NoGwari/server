import {sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const Reply = sequelize.define(
    "reply",
    {
        id: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: DateTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DateTypes.STRING(10),
            allowNull: false,
        },
        originID: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
        ordered: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
        depth: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
    },
    {tableName: "reply"}
);
