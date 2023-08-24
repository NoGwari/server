import SQ from "sequelize";
import {CommentsAttributes, CommentsType} from "../customType/comment.js";
import {sequelize} from "../db/database.js";
import {dbType} from "./index.js";
import User from "./user.js";
import Board from "./data.js";

const DataTypes = SQ.DataTypes;

class Comment extends SQ.Model {
    public id!: number;
    public content!: string;
    public parentCommentsId!: number;
    public hits!: number;
    public reported!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public boardId?: number;
    public userId?: number;

    public readonly user?: User;
    public readonly board?: Board;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        parentCommentsId: {
            type: DataTypes.INTEGER,
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
        boardId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "comments",
        tableName: "comments",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    db.Comment.belongsTo(db.Board, {as: "board"});
    db.Comment.belongsTo(db.User, {as: "user"});
    db.Comment.hasMany(db.HitComment, {onDelete: "CASCADE", hooks: true});
};

export default Comment;
