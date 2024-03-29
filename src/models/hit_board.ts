import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../db/database.js";
import Board from "./board.js";
import User from "./user.js";
import {dbType} from "./index.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

interface HitBoardType {
    userId: number;
    boardId: number;
}

interface HitBoardAttributes {
    id: number;
    userId: number;
    boardId: number;
}

class HitBoard extends SQ.Model<HitBoardAttributes, HitBoardType> implements HitBoardAttributes {
    public id!: number;
    public userId!: number;
    public boardId!: number;

    public readonly user?: User;
    public readonly board?: Board;

    public static associations: {
        user: Association<HitBoard, User>;
        board: Association<HitBoard, Board>;
    };
}

HitBoard.init(
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
    },
    {
        sequelize,
        modelName: "hitboard",
        tableName: "hitboard",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    HitBoard.belongsTo(User, {as: "user"});
    HitBoard.belongsTo(Board, {as: "board"});
};
// {foreignKey: "userId", as: "user", onDelete: "CASCADE", hooks: true}
export default HitBoard;
