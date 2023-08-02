import SQ, {Association, FindOptions, Op} from "sequelize";
import {sequelize} from "../../db/database.js";

import {Category} from "./category.js";
import {User} from "../user.js";
import {Reply} from "./reply.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

// import {BoardType, BoardAttributes} from "../../customType/board.js";
interface BoardType {
    title: string;
    content: string;
    views: number;
    hits: number;
    reported: number;
    hidden: string;
    userId: number;
    categoryId: number;
}

interface BoardAttributes extends BoardType {
    id: number;
    title: string;
    content: string;
    views: number;
    hits: number;
    reported: number;
    hidden: string;
    userId: number;
    categoryId: number;
    userNickname?: string;
    userImg?: string;
    userGrade?: string;
    categoryName?: string;
}

export class Board extends SQ.Model<BoardAttributes, BoardType> implements BoardAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public views!: number;
    public hits!: number;
    public reported!: number;
    public hidden!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public userId!: number;
    public categoryId!: number;
    public userNickname?: string;
    public userImg?: string;
    public userGrade?: string;
    public categoryName?: string;

    public readonly user?: User;
    public readonly category?: Category;

    public static associations: {
        user: Association<Board, User>;
        category: Association<Board, Category>;
    };
}

Board.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        reported: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hidden: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userNickname: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        userImg: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        userGrade: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        categoryName: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "board",
        tableName: "board",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

Board.belongsTo(User, {foreignKey: "userId", as: "user"});
// // Board Category 일대일관계
Board.belongsTo(Category, {foreignKey: "categoryId", as: "category"});

const INCLUDED_ALL: FindOptions<BoardAttributes> = {
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
    return Board.findAll({
        ...INCLUDED_ALL,
        ...ORDER_DESC,
        offset: offset,
        limit: listNum,
        where: {hidden: 0},
    });
}

export async function getPagesToCategory(offset: number, listNum: number, categoryID: number) {
    return Board.findAll({
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
    return Board.findAll({
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
    return Board.findAll({
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
