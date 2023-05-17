import * as boardRepository from "../data/board_Data.js";

export async function getPostings(req, res) {
    const username = req.query.username;
    const data = await (username ? boardRepository.getAllByUsername(username) : boardRepository.getAll());
    console.log(data);
    res.status(200).json(data);
}

export async function getPosting(req, res) {
    const id = req.params.id;
    const data = await boardRepository.getById(id);
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
