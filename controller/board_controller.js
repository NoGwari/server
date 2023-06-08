import * as boardRepository from "../data/board/data.js";

export async function getPostingByPage(req, res) {
    const pageId = req.query.page ? req.query.page : 1;
    const listNum = req.query.list_num ? req.query.list_num : 5; // 검색할 post 개수
    const categoryID = req.query.category;
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    let data;
    if (!categoryID) {
        // categoryID가 없다면 전체 게시글 조회
        data = await boardRepository.getAllbyPages(offset, listNum);
    } else {
        data = await boardRepository.getPagesToCategory(offset, listNum, categoryID);
    }
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

export async function getSearch(req, res) {
    const pageId = req.query.page ? req.query.page : 1;
    const listNum = req.query.list_num ? req.query.list_num : 5; // 검색할 post 개수
    const offset = 0 + (pageId - 1) * listNum; // skip할 item의 개수
    const searchType = req.query.searchType;
    const keyword = req.query.keyword;
    if (!(searchType && keyword)) {
        return res.status(400).json({message: "값을 제대로 입력해주세요."});
    }
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

export async function newPosting(req, res) {
    const {title, content, userId, categoryId} = req.body;
    let {hiddenNum} = req.body;
    if (!hiddenNum) {
        hiddenNum = "0";
    }
    const newPosts = await boardRepository.create(title, content, hiddenNum, userId, categoryId);
    res.status(200).json(newPosts);
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const {title, content, categoryId} = req.body;
    let {hiddenNum} = req.body;
    if (!hiddenNum) {
        hiddenNum = "0";
    }
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
