import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../db/database.js";
import Board from "./data.js";
import User from "./user.js";
import {dbType} from "./index.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

interface ReportedCommentType {
    userId: number;
    commentId: number;
    reason: string;
}

interface ReportedCommentAttributes {
    id: number;
    userId: number;
    commentId: number;
    reason: string;
}

class ReportedComment
    extends SQ.Model<ReportedCommentAttributes, ReportedCommentType>
    implements ReportedCommentAttributes
{
    public id!: number;
    public userId!: number;
    public commentId!: number;
    public reason!: string;

    public readonly user?: User;
    public readonly board?: Board;

    public static associations: {
        user: Association<ReportedComment, User>;
        board: Association<ReportedComment, Board>;
    };
}

ReportedComment.init(
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
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "reportedcomment",
        tableName: "reportedcomment",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    ReportedComment.belongsTo(User, {as: "user"});
    ReportedComment.belongsTo(Board, {as: "board"});
};

export default ReportedComment;
