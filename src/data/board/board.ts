import {BoardType, BoardAttributes} from "../../customType/board";
import SQ, {FindOptions, Op, QueryTypes} from "sequelize";
import Board from "../../models/board.js";
import User from "../../models/user.js";
import Category from "../../models/category.js";
import {sequelize} from "../../models/index.js";
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
        "thumbnail",
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
        where: {
            hidden: 0,
            categoryId: {
                [Op.ne]: null,
            },
        },
    });
}

export async function getPagesToCategory(offset: number, listNum: number, categoryID: number) {
    return Board.findAndCountAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: listNum,
        where: {
            hidden: 0,
            categoryId: {
                [Op.ne]: null,
            },
        },
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

export async function create(title: string, content: string, userId: number, categoryId: number, imageUrl: string) {
    return Board.create<Board>({
        title: title,
        content: content,
        views: 1,
        hits: 0,
        reported: 0,
        hidden: "0",
        thumbnail: imageUrl,
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

export async function updateHidden(id: number) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post: Board | null) => {
        post!.hidden == "0" ? (post!.hidden = "1") : (post!.hidden = "0");
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

export async function minusHits(id: number) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post: Board | null) => {
        post!.hits -= 1;
        return post!.save();
    });
}

export async function plusReportedNum(id: number) {
    return Board.findByPk(id).then((post: Board | null) => {
        post!.reported += 1;
        return post!.save();
    });
}

export async function getMyPost(userId: number) {
    return Board.findAndCountAll({
        attributes: [
            "id",
            "title",
            "hidden",
            "createdAt",
            "updatedAt",
            "thumbnail",
            [Sequelize.col("user.nickname"), "userNickname"],
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
        order: [
            ["createdAt", "DESC"],
            ["title", "DESC"],
        ],
        where: {
            userId,
        },
    });
}

export async function getPopularPost() {
    const posts = await sequelize.query(
        "SELECT * FROM board AS B WHERE id IN ( SELECT * FROM (SELECT boardId FROM hitboard WHERE DATEDIFF(NOW(), createdAt) < 1 GROUP BY boardId ORDER BY COUNT(*) DESC LIMIT 3) AS HB )",
        {
            type: QueryTypes.SELECT,
        }
    );
    return posts;
}
