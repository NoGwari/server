import {sequelize} from "../../db/database.js";
import SQ, {TEXT, where} from "sequelize";

const DataTypes = SQ.DataTypes;

interface CategoryType {
    name: string;
    post_num: number;
}

interface CategoryAttributes extends CategoryType {
    id: number;
}

export class Category extends SQ.Model<CategoryAttributes, CategoryType> implements CategoryAttributes {
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

export async function getCategory(): Promise<CategoryAttributes[]> {
    return Category.findAll({
        attributes: ["id", "name", "post_num"],
        order: [["id", "ASC"]],
    });
}

export async function getById(id: number): Promise<CategoryAttributes | null> {
    return Category.findOne({
        attributes: ["id", "name", "post_num"],
        where: {id},
    });
}

export async function create(name: string): Promise<CategoryAttributes | null> {
    return Category.create({
        name: name,
        post_num: 0,
    }).then((result) => {
        return Category.findOne({
            attributes: ["id", "name", "post_num"],
            where: {id: result.dataValues.id},
        });
    });
}

export async function remove(id: number): Promise<CategoryAttributes | void> {
    return Category.findByPk(id, {
        attributes: ["id", "name", "post_num"],
    }).then((post: any) => {
        post.destroy();
    });
}
