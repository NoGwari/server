import {Request, Response} from "express";
import * as userRepository from "../data/user.js";
import * as commentRepository from "../data/board/comment.js";
import * as boardRepository from "../data/board/data.js";
import * as hitCommentRepository from "../data/board/hit_comment.js";
import Board from "../models/data.js";
import {CommentsAttributes} from "../customType/comment.js";

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

export async function isHits(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const comment: CommentsAttributes | null = await commentRepository.getById(commentId);
    if (!comment) {
        return res.status(404).json(commentId);
    }
    const isHits: boolean = await hitCommentRepository.isHits(commentId, req.userId!);
    res.status(200).json(isHits);
}

export async function incrementHits(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const comment: CommentsAttributes | null = await commentRepository.getById(commentId);
    if (!comment) {
        return res.status(404).json(commentId);
    }
    const isHits: boolean = await hitCommentRepository.isHits(commentId, req.userId!);
    if (isHits) {
        return res.sendStatus(400);
    }
    await hitCommentRepository.increment(commentId, req.userId!);
    await commentRepository.plusHits(commentId);
    res.sendStatus(200);
}

export async function decrementHits(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const comment: CommentsAttributes | null = await commentRepository.getById(commentId);
    if (!comment) {
        return res.status(404).json(commentId);
    }
    const isHits: boolean = await hitCommentRepository.isHits(commentId, req.userId!);
    if (!isHits) {
        return res.sendStatus(400);
    }
    await hitCommentRepository.decrement(commentId, req.userId!);
    await commentRepository.minusHits(commentId);
    res.sendStatus(200);
}
