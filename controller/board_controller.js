import * as boardRepository from "../data/board/data.js";

export async function getPostings(req, res) {
    const pageId = req.query.page;
    const listNum = req.query.list_num;
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    if (!pageId) {
        res.status(404).json(id);
    }
    const data = await boardRepository.getAllbyPages(offset, listNum);
    res.status(200).json(data);
}

export async function getPosting(req, res) {
    const id = req.params.id;
    const data = await boardRepository.getById(id);
    if (!data) {
        res.status(404).json(id);
    } else {
        res.status(200).json(data);
    }
}

export async function newPostings(req, res) {
    const {title, content, hiddenNum, userId, categoryId} = req.body;
    const newposts = await boardRepository.create(title, content, hiddenNum, userId, categoryId);
    res.status(200).json(newposts);
}
