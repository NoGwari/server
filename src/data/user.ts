import {sequelize} from "../db/database.js";
import SQ from "sequelize";

const DataTypes = SQ.DataTypes;

interface UserType {
    realid: string;
    password: string;
    nickname: string;
    email: string;
    img?: string;
    grade: string;
    posting_num: number;
    reply_num: number;
    reported: number;
}

interface UserAttributes extends UserType {
    id: number;
}

export class User extends SQ.Model<UserAttributes, UserType> implements UserAttributes {
    public id!: number;
    public realid!: string;
    public password!: string;
    public nickname!: string;
    public email!: string;
    public grade!: string;
    public img?: string;
    public posting_num!: number;
    public reply_num!: number;
    public reported!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        realid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        grade: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "grade1",
        },
        img: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        posting_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        reply_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        reported: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export async function findByRealId(realid: string): Promise<UserAttributes | null> {
    return User.findOne({where: {realid: realid}});
}

export async function findById(id: number): Promise<UserAttributes | null> {
    return User.findByPk(id);
}

export async function createUser(user: UserType): Promise<string> {
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
    }).then((result) => result.dataValues.id.toString());
}

export async function checkAdmin(realid: string): Promise<UserAttributes | null> {
    return User.findOne({where: {realid: realid, grade: "admin"}});
}
