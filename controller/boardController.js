import * as boardRepository from "../data/boardData.js";

export async function getPostings(req, res) {
    const nickName = req.query.username;
    const data = await (nickName ? boardRepository.getAllByUsername(nickName) : boardRepository.getAll());
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
