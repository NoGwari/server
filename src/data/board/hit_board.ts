import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../../db/database.js";
import {Board} from "./data.js";
import {User} from "../user.js";

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

export class HitBoard extends SQ.Model<HitBoardAttributes, HitBoardType> implements HitBoardAttributes {
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

HitBoard.belongsTo(User, {foreignKey: "userId", as: "user", onDelete: "cascade"});
HitBoard.belongsTo(Board, {foreignKey: "boardId", as: "board", onDelete: "cascade"});

export async function isHits(board: number, user: number): Promise<boolean> {
    const isExist = HitBoard.findOne({
        attributes: ["id", "userId", "boardId"],
        where: {boardId: board, userId: user},
    });
    if (await isExist) {
        return true;
    }
    return false;
}

export async function increment(board: number, user: number): Promise<number> {
    return HitBoard.create({
        userId: user,
        boardId: board,
    }).then((result) => {
        return result.dataValues.id;
    });
}
