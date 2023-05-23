import * as boardRepository from "../data/boardData.js";

export async function getPostings(req, res) {
    const username = req.query.username;
    const data = await (username ? boardRepository.getAllByUsername(username) : boardRepository.getAll());
    res.status(200).json(data);
}

export async function getPosting(req, res) {
    const id = req.params.id;
    console.log("id값:", id);
    const data = await boardRepository.getById(id);
    console.log("data값:", data);
    if (!data) {
        res.status(404).json(id);
    }
    res.status(200).json(data);
}

export async function newPostings(req, res) {
    const {title, content, username, userId} = req.body;
    const newposts = await boardRepository.create(title, content, username, userId);
    res.status(200).json(newposts);
}
