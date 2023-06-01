import {sequelize} from "../db/database.js";
import SQ, {TEXT} from "sequelize";

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
        realname: {
            type: DateTypes.STRING(30),
            allowNull: false,
        },
        gender: {
            type: DateTypes.STRING(5),
            allowNull: false,
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
    {timestamps: false, tableName: "users", charset: "utf8", collate: "utf8_general_ci"}
);

export async function findByRealId(realId) {
    return User.findOne({where: {realId: realId}});
}

export async function findById(id) {
    return User.findByPk(id);
}

export async function createUser(user) {
    const {realid, password, nickname, realname, gender, email, img} = user;
    return User.create({
        realid: realid,
        password: password,
        nickname: nickname,
        realname: realname,
        gender: gender,
        email: email,
        grade: "grade1",
        img: img,
        posting_num: 0,
        reply_num: 0,
        reported: 0,
    }).then((result) => result.dataValues.id);
}
