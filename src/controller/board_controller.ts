import {Request, Response} from "express";
import * as boardRepository from "../data/board/data.js";

interface Board {
    id: number;
    title: string;
    content: string;
    hits: number;
    views: number;
    dislikes: number;
    reported: number;
    hidden: string;
    createdAt: Date;
    updatedAt: Date;
}

interface BoardJoined extends Board {
    userId: number;
    categoryId: number;
    nickname: string;
    img: string;
    grade: string;
    name: string;
}

export async function getPostingByPage(req: Request, res: Response) {
    const pageId: number = req.query.page ? Number(req.query.page) : 1;
    const listNum: number = req.query.list_num ? Number(req.query.list_num) : 5; // 검색할 post 개수
    const categoryID: number | undefined = req.query.category ? Number(req.query.category) : undefined;
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    let data;
    if (!categoryID) {
        // categoryID가 없다면 전체 게시글 조회
        data = await boardRepository.getAllbyPages(offset, listNum);
    } else {
        data = await boardRepository.getPagesToCategory(offset, listNum, categoryID);
    }
    if (!data) {
        res.sendStatus(404);
    }
    res.status(200).json(data);
}

export async function getPosting(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const data: any = await boardRepository.getById(id);
    if (!data) {
        res.status(404).json(id);
    } else {
        res.status(200).json(data);
    }
}

export async function getSearch(req: Request, res: Response) {
    const pageId: number = req.query.page ? Number(req.query.page) : 1;
    const listNum: number = req.query.list_num ? Number(req.query.list_num) : 5; // 검색할 post 개수
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    if (!(req.query.searchType && req.query.searchType)) {
        return res.status(400).json({message: "값을 제대로 입력해주세요."});
    }
    const searchType: string = String(req.query.searchType);
    const keyword: string = String(req.query.searchType);
    let data;
    switch (searchType) {
        case "title":
            data = await boardRepository.getPagesToTitle(offset, listNum, keyword);
            break;
        case "nickname":
            data = await boardRepository.getPagesToNickname(offset, listNum, keyword);
            break;
    }
    if (!data) {
        return res.status(404).json(keyword);
    }
    res.status(200).json(data);
}

export async function newPosting(req: Request, res: Response) {
    const {title, content, userId, categoryId} = req.body;
    let {hiddenNum} = req.body;
    if (!hiddenNum) {
        hiddenNum = "0";
    }
    const newPosts = await boardRepository.create(title, content, hiddenNum, userId, categoryId);
    res.status(200).json(newPosts);
}

export async function updatePost(req: Request, res: Response) {
    const id = Number(req.params.id);
    const {title, content, categoryId} = req.body;
    let {hiddenNum} = req.body;
    if (!hiddenNum) {
        hiddenNum = "0";
    }
    const post: any = boardRepository.getById(id);
    if (!post) {
        return res.status(404).json(id);
    }
    if (req.userId !== post.userId) {
        return res.sendStatus(403);
    }
    const updatePosts = await boardRepository.update(id, title, content, hiddenNum, categoryId);
    res.status(200).json(updatePosts);
}

export async function deletePost(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post: any = boardRepository.getById(id);
    if (!post) {
        res.status(404).json(id);
    }
    if (req.userId !== post.userId) {
        return res.sendStatus(403);
    }
    const deletePosts = await boardRepository.remove(id);
    res.status(200).json(deletePosts);
}
