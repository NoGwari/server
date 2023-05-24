import {sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";
const DateTypes = SQ.DataTypes;

export const Img = sequelize.define(
    "boardimg",
    {
        ImgID: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        ImgURL: {
            type: DateTypes.STRING(300),
            allowNull: false,
        },
    },
    {timestamps: false}
);
