import SQ, {Op} from "sequelize";
import {sequelize} from "../../db/database.js";
import {Category} from "./category.js";
import {User} from "../user.js";
import {Reply} from "./reply.js";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

// define을 쓰면 자동으로 테이블을 만드는데 난 왜 일일이 만들고 그렇게 했을까?

export const Board = sequelize.define(
    "board",
    {
        id: {
            type: DateTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DateTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DateTypes.TEXT,
            allowNull: false,
        },
        views: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
        hits: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
        dislikes: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
        reported: {
            type: DateTypes.INTEGER.ZEROFILL,
            allowNull: false,
        },
        hidden: {
            type: DateTypes.STRING(1),
            allowNull: false,
        },
    },
    {tableName: "board", charset: "utf8", collate: "utf8_general_ci"}
);

// // Board User 일대일관계
Board.belongsTo(User);
// // Board Category 일대일관계
Board.belongsTo(Category);

const INCLUDED_ALL = {
    attributes: [
        "id",
        "title",
        "content",
        "hits",
        "views",
        "dislikes",
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
            attributes: [],
        }, // model을 두개 정의하는 법을 이렇게 하면 되는구나!
        {
            model: Category,
            attributes: [],
        },
    ],
};

const ORDER_DESC = {order: [["createdAt", "DESC"]]};

export async function getAllbyPages(offset, listNum) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: parseInt(listNum),
        where: {hidden: 0},
    });
}

export async function getPagesToCategory(offset, listNum, categoryID) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: parseInt(listNum),
        where: {hidden: 0},
        include: [
            {
                model: Category,
                attributes: [],
                where: {id: categoryID},
            },
            {
                model: User,
                attributes: [],
            },
        ],
    });
}

export async function getPagesToTitle(offset, listNum, title) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: parseInt(listNum),
        where: {
            hidden: 0,
            title: {
                [Op.like]: "%" + title + "%",
            },
        },
    });
}

export async function getPagesToNickname(offset, listNum, nickName) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: parseInt(listNum),
        where: {hidden: 0},
        include: [
            {
                model: Category,
                attributes: [],
            },
            {
                model: User,
                attributes: [],
                where: {
                    nickname: {
                        [Op.like]: "%" + nickName + "%",
                    },
                },
            },
        ],
    });
}

export async function getAllByUsername(nickName) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        include: [
            {
                model: User,
                attributes: [],
                where: {nickname: nickName},
            },
            {
                model: Category,
                attributes: [],
            },
        ],
    });
}

export async function getById(id) {
    return Board.findOne({
        ...INCLUDED_ALL,
        where: {id},
    });
}

export async function create(title, content, hiddenNum, userId, categoryId) {
    return Board.create({
        title: title,
        content: content,
        views: 1,
        hits: 0,
        dislikes: 0,
        reported: 0,
        hidden: hiddenNum,
        userId,
        categoryId,
    }).then((result) => {
        return getById(result.dataValues.id);
    });
}

export async function update(id, title, content, hiddenNum, categoryId) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post) => {
        post.title = title;
        post.content = content;
        post.hidden = hiddenNum;
        post.categoryId = categoryId;
        return post.save();
    });
}

export async function remove(id) {
    return Board.findByPk(id, {
        ...INCLUDED_ALL,
    }).then((post) => {
        post.destroy();
    });
}
