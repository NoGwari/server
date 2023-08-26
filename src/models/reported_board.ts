import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../db/database.js";
import Board from "./data.js";
import User from "./user.js";
import {dbType} from "./index.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

interface ReportedBoardType {
    userId: number;
    boardId: number;
    reason: string;
}

interface ReportedBoardAttributes {
    id: number;
    userId: number;
    boardId: number;
    reason: string;
}

class ReportedBoard extends SQ.Model<ReportedBoardAttributes, ReportedBoardType> implements ReportedBoardAttributes {
    public id!: number;
    public userId!: number;
    public boardId!: number;
    public reason!: string;

    public readonly user?: User;
    public readonly board?: Board;

    public static associations: {
        user: Association<ReportedBoard, User>;
        board: Association<ReportedBoard, Board>;
    };
}

ReportedBoard.init(
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
        boardId: {
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
        modelName: "reportedboard",
        tableName: "reportedboard",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    ReportedBoard.belongsTo(User, {as: "user"});
    ReportedBoard.belongsTo(Board, {as: "board"});
};

export default ReportedBoard;
