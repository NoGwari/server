import SQ, {TEXT} from "sequelize";
import {sequelize} from "../../db/database.js";
import {Category} from "./category.js";
import {User} from "../user.js";
import {Reply} from "./reply.js";
import {Img} from "./img.js";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

// define을 쓰면 자동으로 테이블을 만드는데 난 왜 일일이 만들고 그렇게 했을까?
// 스키마를 정의하는 과정에서 테이블명을 빼는게 좋은 이유?

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

// Board User 일대일관계
User.hasOne(Board);
Board.belongsTo(User);
// Board Category 일대일관계
Category.hasOne(Board);
Board.belongsTo(Category);
// Board Reply 일대다관계
Board.hasMany(Reply);
Reply.belongsTo(Board);
// Board Img 일대다관계
Board.hasMany(Img);
Img.belongsTo(Board);

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
