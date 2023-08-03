import {Request, Response} from "express";
import * as boardRepository from "../data/board/data.js";
import * as userRepository from "../data/user.js";

export async function changeNickname(req: Request, res: Response) {
    const id = Number(req.userId);
    const {nickname} = req.body;
    await userRepository.updateNickname(id, nickname);
    res.status(200).json({nickname: nickname});
}

export async function withDrawal(req: Request, res: Response) {
    const deleteUser = await userRepository.deleteUser(req.userId!);
    res.status(200).json(deleteUser);
}
