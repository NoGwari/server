import * as categoryRepository from "../data/board/category.js";

export async function getCategory(req, res) {
    const data = await categoryRepository.getCategory();
    if (!data) {
        res.status(404).json();
    }
    res.status(200).json(data);
}

export async function newCategory(req, res) {
    const {name} = req.body;
    const newCategory = await categoryRepository.create(name);
    res.status(200).json(newCategory);
}
