import {sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const User = sequelize.define(
    "user",
    {
        UserIDtoNum: {
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
        UserGender: {
            type: DateTypes.STRING(5),
            allowNull: false,
        },
        UserEmail: {
            type: DateTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        UserGrade: {
            type: DateTypes.STRING(10),
            allowNull: false,
        },
        UserImg: {
            type: DateTypes.STRING(100),
            allowNull: true,
        },
        UserPostingNum: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
        UserReplyNum: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
        UserReported: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
    },
    {timestamps: false}
);
