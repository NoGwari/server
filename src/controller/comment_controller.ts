import {Request, Response} from "express";
import * as userRepository from "../data/user.js";
import * as commentRepository from "../data/board/comment.js";
import * as boardRepository from "../data/board/data.js";
import * as hitBoardRepository from "../data/board/hit_board.js";

export async function newComment(req: Request, res: Response) {
    const boardId: number = Number(req.params.id);
    const userId: number = req.userId!;
    const content = req.body.content;
    const createComment = await commentRepository.create(content, userId, boardId);
    await userRepository.incrementReplyNum(userId);
    res.status(200).json(createComment);
}
