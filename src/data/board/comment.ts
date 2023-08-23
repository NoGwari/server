import SQ, {FindOptions} from "sequelize";
import {CommentsAttributes, CommentsType} from "../../customType/comment.js";
import Board from "../../models/data.js";
import User from "../../models/user.js";
import Comment from "../../models/comment.js";
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
        "userId",
        "boardId",
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

export async function getAll(boardId: number) {
    return Comment.findAll({
        ...INCLUDED_ALL,
        where: {boardId},
    });
}

export async function getById(id: number) {
    return Comment.findOne({
        ...INCLUDED_ALL,
        where: {id},
    });
}

export async function create(content: string, userId: number, boardId: number) {
    return Comment.create<Comment>({
        content: content,
        parentCommentsId: 0,
        hits: 0,
        reported: 0,
        userId: userId,
        boardId: boardId,
    }).then((result) => {
        return getById(result.dataValues.id);
    });
}

export async function createReply(content: string, parentCommentId: number, userId: number, boardId: number) {
    return Comment.create<Comment>({
        content: content,
        parentCommentsId: parentCommentId,
        hits: 0,
        reported: 0,
        userId: userId,
        boardId: boardId,
    }).then((result) => {
        return getById(result.dataValues.id);
    });
}
