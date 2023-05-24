import {db, sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const Reply = sequelize.define("boardreplie", {
    ReplyId: {
        type: DateTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    UserID: {
        type: DateTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    UserPassword: {
        type: DateTypes.STRING(100),
        allowNull: false,
    },
    UserNickName: {
        type: DateTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    UserRealName: {
        type: DateTypes.STRING(30),
        allowNull: false,
    },
    UserDepth: {
        type: DateTypes.INTEGER,
        allowNull: false,
    },
});
