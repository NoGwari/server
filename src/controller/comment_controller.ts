import {Request, Response} from "express";
import * as userRepository from "../data/user.js";
import * as commentRepository from "../data/board/comment.js";
import * as boardRepository from "../data/board/data.js";
import * as hitBoardRepository from "../data/board/hit_board.js";
import Board from "../models/data.js";

export async function getComment(req: Request, res: Response) {
    const boardId: number = Number(req.params.id);
    const isBoard: Board | null = await boardRepository.getById(boardId);
    if (!isBoard) {
        return res.status(404).json(boardId);
    }
    const comment = await commentRepository.getAllComment(boardId);
    const reply = await commentRepository.getAllReply(boardId);
    const result = {
        comment: comment,
        reply: reply,
    };
    res.status(200).json(result);
}

export async function newComment(req: Request, res: Response) {
    const boardId: number = Number(req.params.id);
    const isBoard: Board | null = await boardRepository.getById(boardId);
    if (!isBoard) {
        return res.status(404).json(boardId);
    }
    const userId: number = req.userId!;
    const content = req.body.content;
    const createComment = await commentRepository.create(content, userId, boardId);
    await userRepository.incrementReplyNum(userId);
    res.status(201).json(createComment);
}

export async function newReply(req: Request, res: Response) {
    const boardId: number = Number(req.params.id);
    const isBoard: Board | null = await boardRepository.getById(boardId);
    if (!isBoard) {
        return res.status(404).json(boardId);
    }
    const userId: number = req.userId!;
    const {content, parentCommentId} = req.body;
    const createReply = await commentRepository.createReply(content, parentCommentId, userId, boardId);
    await userRepository.incrementReplyNum(userId);
    res.status(201).json(createReply);
}
