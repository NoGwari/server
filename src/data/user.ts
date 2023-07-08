import {sequelize} from "../db/database.js";
import SQ, {TEXT, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional} from "sequelize";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

export const User = sequelize.define(
    "user",
    {
        id: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        realid: {
            type: DateTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DateTypes.STRING(100),
            allowNull: false,
        },
        nickname: {
            type: DateTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DateTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        grade: {
            type: DateTypes.STRING(10),
            allowNull: false,
        },
        img: {
            type: DateTypes.STRING(100),
            allowNull: true,
        },
        posting_num: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
        reply_num: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
        reported: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
    },
    {timestamps: false, charset: "utf8", collate: "utf8_general_ci"}
);

export async function findByRealId(realid: string) {
    return User.findOne({where: {realid: realid}});
}

export async function findById(id: number) {
    return User.findByPk(id);
}

export async function createUser(user: any) {
    const {realid, password, nickname, email, img} = user;
    return User.create({
        realid: realid,
        password: password,
        nickname: nickname,
        email: email,
        grade: "grade1",
        img: img,
        posting_num: 0,
        reply_num: 0,
        reported: 0,
    }).then((result) => result.dataValues.id);
}

export async function checkAdmin(realid: string) {
    return User.findOne({where: {realid: realid, grade: "admin"}});
}
