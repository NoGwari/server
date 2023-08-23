import {BoardType, BoardAttributes} from "../../customType/board";
import SQ, {FindOptions, Op} from "sequelize";
import Board from "../../models/data.js";
import User from "../../models/user.js";
import Category from "../../models/category.js";
const Sequelize = SQ.Sequelize;

const INCLUDED_ALL: FindOptions<BoardAttributes> = {
    attributes: [
        "id",
        "title",
        "content",
        "hits",
        "views",
        "reported",
        "hidden",
        "createdAt",
        "updatedAt",
        "userId",
        "categoryId",
        [Sequelize.col("user.nickname"), "userNickname"],
        [Sequelize.col("user.img"), "userImg"],
        [Sequelize.col("user.grade"), "userGrade"],
        [Sequelize.col("category.name"), "categoryName"],
    ],
    include: [
        {
            model: User,
            as: "user",
            attributes: [],
        },
        {
            model: Category,
            as: "category",
            attributes: [],
        },
    ],
};

const ORDER_DESC: FindOptions<BoardAttributes> = {
    order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
    ],
};

export async function getAllbyPages(offset: number, listNum: number) {
    return Board.findAndCountAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: listNum,
        where: {hidden: 0},
    });
}

export async function getPagesToCategory(offset: number, listNum: number, categoryID: number) {
    return Board.findAndCountAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: listNum,
        where: {hidden: 0},
        include: [
            {
                model: Category,
                attributes: [],
                as: "category",
                where: {id: categoryID},
            },
            {
                model: User,
                as: "user",
                attributes: [],
            },
        ],
    });
}

export async function getPagesToTitle(offset: number, listNum: number, keyword: string) {
    return Board.findAndCountAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: listNum,
        where: {
            hidden: "0",
            title: {
                [Op.substring]: keyword,
            },
        },
    });
}

export async function getPagesToNickname(offset: number, listNum: number, paramNickname: string) {
    return Board.findAndCountAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: listNum,
        where: {hidden: 0},
        include: [
            {
                model: Category,
                as: "category",
                attributes: [],
            },
            {
                model: User,
                as: "user",
                attributes: [],
                where: {
                    nickname: {
                        [Op.substring]: paramNickname,
                    },
                },
            },
        ],
    });
}

export async function getAllByUsername(nickname: string) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        include: [
            {
                model: User,
                as: "user",
                attributes: [],
                where: {nickname},
            },
            {
                model: Category,
                as: "category",
                attributes: [],
            },
        ],
    });
}

export async function getById(id: number) {
    return Board.findOne({
        ...INCLUDED_ALL,
        where: {id},
    });
}

export async function create(title: string, content: string, userId: number, categoryId: number) {
    return Board.create<Board>({
        title: title,
        content: content,
        views: 1,
        hits: 0,
        reported: 0,
        hidden: "0",
        userId: userId,
        categoryId: categoryId,
    }).then((result) => {
        return getById(result.dataValues.id);
    });
}

export async function update(id: number, title: string, content: string, hiddenNum: string, categoryId: number) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post: Board | null) => {
        post!.title = title;
        post!.content = content;
        post!.hidden = hiddenNum;
        post!.categoryId = categoryId;
        return post!.save();
    });
}

export async function remove(id: number) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post: any) => {
        post.destroy();
    });
}

export async function incrementViewCount(id: number) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post: Board | null) => {
        post!.views += 1;
        return post!.save();
    });
}

export async function plusHits(id: number) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post: Board | null) => {
        post!.hits += 1;
        return post!.save();
    });
}
