import SQ, {TEXT} from "sequelize";
import {sequelize} from "../db/database.js";

const Sequelize = SQ.Sequelize;
const DateTypes = SQ.DataTypes;

const Posts = sequelize.define("post", {
    BoardID: {
        type: DateTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    BoardTitle: {
        type: DateTypes.CHAR(20),
        allowNull: false,
    },
    BoardContent: {
        type: DateTypes.TEXT,
        allowNull: false,
    },
    BoardViews: {
        type: DateTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    BoardHits: {
        type: DateTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    BoardDislikes: {
        type: DateTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    BoardReported: {
        type: DateTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    BoardHidden: {
        type: DateTypes.CHAR(1),
        allowNull: false,
    },
    BoardCreatedAt: {
        type: DateTypes.DATE,
        allowNull: false,
    },
    BoardUpdatedAt: {
        type: DateTypes.DATE,
        allowNull: true,
    },
});

// Board.belongsTo(User);

// const INCLUDED_USER = {
//     attributes: [
//         "BoardID",
//         "BoardTitle",
//         "BoardContent",
//         "BoardHits",
//         "BoardViews",
//         "BoardDislikes",
//         "BoardReported",
//         "BoardHidden",
//         "BoardCreatedAt",
//         "BoardUpdatedAt",
//         [Sequelize.col("user.UserIDtoNum"), "UserIDtoNum"],
//         [Sequelize.col("user.UserNickname"), "UserNickname"],
//         [Sequelize.col("user.UserImg"), "UserImg"],
//         [Sequelize.col("user.UserGrade"), "UserGrade"],
//     ],
//     include: {
//         model: User,
//         attributes: [],
//     },
// };
// const ORDER_DESC = {order: [["createdAt", "DESC"]]};

export async function getAll() {
    return Sequelize.find;
}

export async function getAllByUsername(username) {
    const arr = posting.filter((post) => post.username === username);
    return arr;
}

export async function getById(id) {
    const posts = posting.find((post) => post.id === parseInt(id));
    return posts;
}

export async function create(title, content, username, userId) {
    const newPosts = {
        id: posting.length + 1,
        title,
        content,
        username,
        userId,
        createdAt: new Date().toString(),
    };
    posting.push(newPosts);
    return newPosts;
}
