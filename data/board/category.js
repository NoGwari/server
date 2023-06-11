import {sequelize} from "../../db/database.js";
import SQ, {TEXT, where} from "sequelize";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

export const Category = sequelize.define(
    "category",
    {
        id: {
            type: DateTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DateTypes.STRING(30),
            allowNull: false,
        },
        post_num: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
    },
    {timestamps: false, tableName: "category", charset: "utf8", collate: "utf8_general_ci"}
);

export async function getCategory() {
    return Category.findAll({
        attributes: ["id", "name", "post_num"],
        order: [["id", "ASC"]],
    });
}

export async function getById(id) {
    return Category.findOne({
        attributes: ["id", "name", "post_num"],
        where: {id},
    });
}

export async function create(name) {
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

export async function remove(id) {
    return Category.findByPk(id, {
        attributes: ["id", "name", "post_num"],
    }).then((post) => {
        post.destroy();
    });
}
