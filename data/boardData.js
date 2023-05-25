import SQ, {TEXT} from "sequelize";
import {sequelize} from "../db/database.js";
import {Category} from "./boardCategory.js";
import {User} from "./user.js";
import {Reply} from "./boardReply.js";
import {Img} from "./boardimg.js";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

// define을 쓰면 자동으로 테이블을 만드는데 난 왜 일일이 만들고 그렇게 했을까?
// 스키마를 정의하는 과정에서 테이블명을 빼는게 좋은 이유?
const Board = sequelize.define("board", {
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
        unique: true,
        allowNull: false,
    },
    hits: {
        type: DateTypes.INTEGER.ZEROFILL,
        unique: true,
        allowNull: false,
    },
    dislikes: {
        type: DateTypes.INTEGER.ZEROFILL,
        unique: true,
        allowNull: false,
    },
    reported: {
        type: DateTypes.INTEGER.ZEROFILL,
        unique: true,
        allowNull: false,
    },
    hidden: {
        type: DateTypes.STRING(1),
        allowNull: false,
    },
});

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
        [Sequelize.col("user.nickname"), "nickname"],
        [Sequelize.col("user.img"), "img"],
        [Sequelize.col("user.grade"), "grade"],
        [Sequelize.col("category.name"), "name"],
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

export async function getAll() {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
    });
}

export async function getAllByUsername(username) {
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        include: {
            where: {username},
        },
    });
}

export async function getById(id) {
    return Board.findOne({
        ...INCLUDED_ALL,
        include: {
            where: {id},
        },
    });
}

export async function create(title, content, hiddenNum, username, categoryId) {
    return Board.create({
        BoardTitle: title,
        BoardContent: content,
        BoardHidden: hiddenNum,
    }).then((result) => {
        console.log(title, content);
        return getById(result.dataValues.id);
    });
}
