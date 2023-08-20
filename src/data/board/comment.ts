import SQ, {FindOptions} from "sequelize";
import {CommentsAttributes, CommentsType} from "../../customType/comment.js";
import Board from "../../models/data.js";
import User from "../../models/user.js";

const Sequelize = SQ.Sequelize;

const INCLUDED_ALL: FindOptions<CommentsAttributes> = {
    attributes: [
        "id",
        "boardId",
        "userId",
        "content",
        "hits",
        "reported",
        "createdAt",
        "updatedAt",
        [Sequelize.col("user.nickname"), "userNickname"],
        [Sequelize.col("user.img"), "userImg"],
        [Sequelize.col("user.grade"), "userGrade"],
    ],
    include: [
        {
            model: Board,
            as: "board",
            attributes: [],
        },
        {
            model: User,
            as: "user",
            attributes: [],
        },
    ],
};

const ORDER_DESC: FindOptions<CommentsAttributes> = {
    order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
    ],
};
