import {sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const Reply = sequelize.define("boardreplie", {
    ReplyID: {
        type: DateTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ReplyContent: {
        type: DateTypes.TEXT,
        allowNull: false,
    },
    ReplyUsername: {
        type: DateTypes.STRING(10),
        allowNull: false,
    },
    ReplyOriginID: {
        type: DateTypes.INTEGER,
        allowNull: false,
    },
    ReplyOrder: {
        type: DateTypes.INTEGER,
        allowNull: false,
    },
    ReplyDepth: {
        type: DateTypes.INTEGER,
        allowNull: false,
    },
});
