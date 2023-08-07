import SQ, {TEXT, where} from "sequelize";
import {sequelize} from "../db/database.js";
import {dbType} from "./index.js";

const DataTypes = SQ.DataTypes;

export interface CategoryType {
    name: string;
    post_num: number;
}

export interface CategoryAttributes extends CategoryType {
    id: number;
}

class Category extends SQ.Model<CategoryAttributes, CategoryType> implements CategoryAttributes {
    public id!: number;
    public name!: string;
    public post_num!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        post_num: {
            type: DataTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "category",
        tableName: "category",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

export const associate = (db: dbType) => {
    db.Category.hasMany(db.Board);
};

export default Category;
