import SQ from "sequelize";
import {CommentsAttributes, CommentsType} from "../customType/comment.js";
import {sequelize} from "../db/database.js";
import {dbType} from "./index.js";

const DataTypes = SQ.DataTypes;

class Comment extends SQ.Model<CommentsAttributes, CommentsType> implements CommentsAttributes {
    public id!: number;
    public boardId!: number;
    public userId!: number;
    public content!: string;
    public parentCommentsId!: number;
    public userNickname?: string;
    public userImg?: string;
    public userGrade?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        boardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        parentCommentsId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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
};

export default Comment;
