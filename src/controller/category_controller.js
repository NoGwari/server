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

export async function deleteCategory(req, res) {
    const id = req.params.id;
    const category = categoryRepository.getById(id);
    if (!category) {
        res.status(404).json(id);
    }
    //TODO 관리자 권한 파악후 삭제여부 기능 추가
    const deleteCategoryID = await categoryRepository.remove(id);
    res.status(200).json(deleteCategoryID);
}
