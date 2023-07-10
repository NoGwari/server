import {sequelize} from "../../db/database.js";
import SQ from "sequelize";

const DataTypes = SQ.DataTypes;

interface ReplyAttributes {
    id: number;
    content: string;
    username: string;
    originID: number;
    ordered: number;
    depth: number;
}

export class Reply extends SQ.Model<ReplyAttributes> implements ReplyAttributes {
    public id!: number;
    public content!: string;
    public username!: string;
    public originID!: number;
    public ordered!: number;
    public depth!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Reply.init(
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
        username: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        originID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ordered: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        depth: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "reply",
        tableName: "reply",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);
