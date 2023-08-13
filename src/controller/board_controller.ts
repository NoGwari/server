import {Request, Response} from "express";
import {BoardAttributes} from "../customType/board";
import * as boardRepository from "../data/board/data.js";
import * as hitBoardRepository from "../data/board/hit_board.js";
import * as userRepository from "../data/user.js";
import {upload} from "../db/multer.js";

export async function getPostingByPage(req: Request, res: Response) {
    const pageId: number = req.query.page ? Number(req.query.page) : 1;
    const listNum: number = req.query.list_num ? Number(req.query.list_num) : 5; // 검색할 post 개수
    const categoryID: number | undefined = req.query.category ? Number(req.query.category) : undefined;
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    let data: BoardAttributes[] | null;
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
    const postId: number = Number(req.params.id);
    const data: BoardAttributes | null = await boardRepository.getById(postId);
    if (!data) {
        return res.status(404).json(postId);
    }
    if (!req.session.viewCount) {
        req.session.viewCount = [];
    }
    if (!req.session.viewCount.includes(postId)) {
        await boardRepository.incrementViewCount(postId);
        req.session.viewCount.push(postId);
    }
    res.status(200).json(data);
}

export async function getSearch(req: Request, res: Response) {
    const pageId: number = req.query.page ? Number(req.query.page) : 1;
    const listNum: number = req.query.list_num ? Number(req.query.list_num) : 5; // 검색할 post 개수
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    const searchType: string = String(req.query.searchType);
    const keyword: string = String(req.query.keyword);

    if (searchType === "" || keyword.length < 2) {
        return res.status(400).json({message: "값을 제대로 입력해주세요."});
    }
    if (searchType !== "title" && searchType !== "nickname") {
        return res.status(400).json({message: "종류를 제대로 입력해주세요."});
    }
    let data: BoardAttributes[];
    switch (searchType) {
        case "title":
            data = await boardRepository.getPagesToTitle(offset, listNum, keyword);
            break;
        case "nickname":
            data = await boardRepository.getPagesToNickname(offset, listNum, keyword);
            break;
    }
    if (data.length === 0) {
        return res.status(204).json(keyword);
    }
    res.status(200).json(data);
}

export async function newPosting(req: Request, res: Response) {
    const parsingJson = JSON.parse(req.body.jsonData);
    const {title, content, categoryId} = parsingJson;
    if (req.files) {
        const imagefiles: any = req.files;
        for (let i = 0; i < imagefiles.length; i++) {
            const fileName = req.files[i].fieldname;
            req.fileName = req.body[`imageFile${i}`];
            console.log(req.fileName);
        }
    }
    console.log(title, content, categoryId);
    const userId: number = req.userId!;
    const newPosts = await boardRepository.create(title, content, userId, categoryId);
    await userRepository.incrementPostNum(userId);
    res.status(200).json(newPosts);
}

export async function updatePost(req: Request, res: Response) {
    const postId = Number(req.params.id);
    const {title, content, hiddenNum, categoryId} = req.body;
    const post: BoardAttributes | null = await boardRepository.getById(postId);
    if (!post) {
        return res.status(404).json(postId);
    }
    if (req.userId !== post.userId) {
        return res.sendStatus(403);
    }
    const updatePosts = await boardRepository.update(postId, title, content, hiddenNum, categoryId);
    res.status(200).json(updatePosts);
}

export async function uploadTest(req: Request, res: Response) {
    upload.array("file");
    const boardId: number = Number(req.params.id);
    res.status(200).json();
}

export async function deletePost(req: Request, res: Response) {
    const postId = Number(req.params.id);
    const userId: number = req.userId!;
    const post: BoardAttributes | null = await boardRepository.getById(postId);
    if (!post) {
        return res.status(404).json(postId);
    }
    if (req.userId !== post!.userId) {
        return res.sendStatus(403);
    }
    const deletePosts = await boardRepository.remove(postId);
    await userRepository.decrementPostNum(userId);
    res.status(200).json(deletePosts);
}

export async function incrementHits(req: Request, res: Response) {
    const postId = Number(req.params.id);
    const post: BoardAttributes | null = await boardRepository.getById(postId);
    if (!post) {
        return res.status(404).json(postId);
    }
    const isHits: boolean = await hitBoardRepository.isHits(postId, req.userId!);
    if (isHits) {
        return res.sendStatus(400);
    }
    await hitBoardRepository.increment(postId, req.userId!);
    await boardRepository.plusHits(postId);
    res.sendStatus(200);
}
