import * as boardRepository from "../data/board/data.js";

export async function getPostingByPage(req, res) {
    const pageId = req.query.page ? req.query.page : 1;
    const listNum = req.query.list_num ? req.query.list_num : 5; // 검색할 post 개수
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    const data = await boardRepository.getAllbyPages(offset, listNum);
    if (!data) {
        res.status(404).json(id);
    }
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

export async function newPosting(req, res) {
    const {title, content, hiddenNum, userId, categoryId} = req.body;
    const newPosts = await boardRepository.create(title, content, hiddenNum, userId, categoryId);
    res.status(200).json(newPosts);
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const {title, content, hiddenNum, categoryId} = req.body;
    const post = boardRepository.getById(id);
    if (!post) {
        res.status(404).json(id);
    }
    //fix userId 확인절차 추가해야함
    const updatePosts = await boardRepository.update(id, title, content, hiddenNum, categoryId);
    res.status(200).json(updatePosts);
}

export async function deletePost(req, res) {
    const id = req.params.id;
    const post = boardRepository.getById(id);
    if (!post) {
        res.status(404).json(id);
    }
    //fix userId 확인절차 추가해야함
    const deletePosts = await boardRepository.remove(id);
    res.status(200).json(deletePosts);
}
