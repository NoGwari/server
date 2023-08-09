import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../db/database.js";
import Category from "./category.js";
import User from "./user.js";
import {dbType} from "./index.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

class Board extends SQ.Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public views!: number;
    public hits!: number;
    public reported!: number;
    public hidden!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public userId!: number;
    public categoryId!: number;
    public userNickname?: string;
    public userImg?: string;
    public userGrade?: string;
    public categoryName?: string;

    public readonly user?: User;
    public readonly category?: Category;

    public static associations: {
        user: Association<Board, User>;
        category: Association<Board, Category>;
    };
}

Board.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        reported: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hidden: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userNickname: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        userImg: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        userGrade: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        categoryName: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "board",
        tableName: "board",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    db.Board.belongsTo(db.User, {foreignKey: "userId", as: "user", onDelete: "SET NULL"});
    db.Board.belongsTo(db.Category);
    db.Board.hasMany(db.Comment, {onDelete: "CASCADE"});
    db.Board.hasMany(db.HitBoard, {onDelete: "CASCADE"});
};

export default Board;
