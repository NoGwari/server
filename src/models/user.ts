import {sequelize} from "../db/database.js";
import SQ from "sequelize";
import {dbType} from "./index.js";

const DataTypes = SQ.DataTypes;

export interface UserType {
    password: string;
    nickname: string;
    email: string;
    img?: string;
    grade: string;
    posting_num: number;
    reply_num: number;
    reported: number;
}

export interface UserAttributes extends UserType {
    id: number;
}

class User extends SQ.Model {
    public id!: number;
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
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(50),
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

export const associate = (db: dbType) => {
    db.User.hasMany(db.Board, {onDelete: "CASCADE", onUpdate: "CASCADE", hooks: true});
    db.User.hasMany(db.Comment, {onDelete: "CASCADE", onUpdate: "CASCADE", hooks: true});
    db.User.hasMany(db.HitBoard, {onDelete: "CASCADE", onUpdate: "CASCADE", hooks: true});
    db.User.hasMany(db.HitComment, {onDelete: "CASCADE", onUpdate: "CASCADE", hooks: true});
};

export default User;
