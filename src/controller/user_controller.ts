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

export async function newImage(req: Request, res: Response) {
    const id = Number(req.userId);
    const image: any = req.file!;
    await userRepository.updateImg(id, image.location);
    res.status(200).json(image.location); // 이미지의 S3 URL
}

export async function updateDefalutImage(req: Request, res: Response) {
    const id = Number(req.userId);
    await userRepository.updateImg(id, "https://nogwari2.s3.ap-northeast-2.amazonaws.com/user/defalut.png");
    res.status(200).json({id, url: "https://nogwari2.s3.ap-northeast-2.amazonaws.com/user/defalut.png"}); // 이미지의 S3 URL
}
