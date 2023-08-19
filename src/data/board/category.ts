import SQ, {TEXT, where} from "sequelize";
import {sequelize} from "../../db/database.js";
import Category, {CategoryAttributes} from "../../models/category.js";

const DataTypes = SQ.DataTypes;

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

export async function incrementPostNum(id: number) {
    return Category.findByPk(id).then((category: Category | null) => {
        category!.post_num++;
        return category!.save();
    });
}

export async function decrementPostNum(id: number) {
    return Category.findByPk(id).then((category: Category | null) => {
        category!.post_num--;
        return category!.save();
    });
}
