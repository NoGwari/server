import {Request, Response} from "express";
import * as userRepository from "../data/user.js";
import * as commentRepository from "../data/board/comment.js";
import * as boardRepository from "../data/board/board.js";
import * as hitCommentRepository from "../data/board/hit_comment.js";
import * as reportedCommentRepository from "../data/board/reported_comment.js";
import Board from "../models/board.js";
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

export async function report(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const userId = Number(req.userId); // 신고한 사람 id
    const reason = req.body.reason;
    const comments = await commentRepository.getById(commentId);
    if (!comments) {
        return res.status(404).json({commentId});
    }
    const isReported = await reportedCommentRepository.isReported(commentId, userId);
    if (isReported) {
        return res.status(400).json({commentId, userId});
    }
    await reportedCommentRepository.report(commentId, userId, reason);
    await commentRepository.plusReportedNum(commentId);
    await userRepository.incrementReportedNum(comments.userId!); // 신고 당한사람 아이디
    res.sendStatus(201);
}

export async function updateComment(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const userId = Number(req.userId); // 수정 희망한 사람 id
    const content = req.body.content;
    const comments = await commentRepository.getById(commentId);
    if (!comments) {
        return res.status(404).json({commentId});
    }
    if (comments.userId !== userId) {
        // 댓글 수정희망 인원과 댓글 주인이 다름
        return res.status(400).json({commentId});
    }
    await commentRepository.update(commentId, content);
    res.sendStatus(200);
}

export async function deleteComment(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const userId = Number(req.userId); // 삭제 희망한 사람 id
    const comments = await commentRepository.getById(commentId);
    if (!comments) {
        return res.status(404).json({commentId});
    }
    if (comments.userId !== userId) {
        // 댓글 삭제희망 인원과 댓글 주인이 다름
        return res.status(400).json({commentId});
    }
    await commentRepository.remove(commentId);
    await userRepository.decrementReplyNum(userId);
    res.sendStatus(204);
}
