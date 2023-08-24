import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../db/database.js";
import User from "./user.js";
import Comment from "./comment.js";
import {dbType} from "./index.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

interface HitCommentType {
    userId: number;
    commentId: number;
}

interface HitCommentAttributes {
    id: number;
    userId: number;
    commentId: number;
}

class HitComment extends SQ.Model<HitCommentAttributes, HitCommentType> implements HitCommentAttributes {
    public id!: number;
    public userId!: number;
    public commentId!: number;

    public readonly user?: User;
    public readonly comment?: Comment;

    public static associations: {
        user: Association<HitComment, User>;
        comment: Association<HitComment, Comment>;
    };
}

HitComment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "hitcomment",
        tableName: "hitcomment",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    HitComment.belongsTo(Comment, {as: "comment"});
    HitComment.belongsTo(User, {as: "user"});
};

export default HitComment;
