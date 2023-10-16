import {Request, Response} from "express";
import * as categoryRepository from "../data/board/category.js";

export async function getCategory(req: Request, res: Response) {
    const data = await categoryRepository.getCategory();
    if (!data) {
        res.sendStatus(404);
    }
    res.status(200).json(data);
}

export async function newCategory(req: Request, res: Response) {
    const {name} = req.body;
    const newCategory = await categoryRepository.create(name);
    res.status(200).json(newCategory);
}

export async function deleteCategory(req: Request, res: Response) {
    const id = Number(req.params.id);
    const category = categoryRepository.getById(id);
    if (!category) {
        res.status(404).json(id);
    }
    const deleteCategoryID = await categoryRepository.remove(id);
    res.status(200).json(deleteCategoryID);
}
