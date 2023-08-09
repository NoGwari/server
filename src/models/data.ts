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
    public userId?: number;
    public categoryId?: number;

    public readonly user?: User;
    public readonly category?: Category;
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
    db.Board.belongsTo(db.User, {as: "user"});
    db.Board.belongsTo(db.Category, {as: "category"});
    db.Board.hasMany(db.Comment, {onDelete: "CASCADE", hooks: true});
    db.Board.hasMany(db.HitBoard, {onDelete: "CASCADE", hooks: true});
};

export default Board;
