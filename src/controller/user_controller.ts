import {Request, Response} from "express";
import nodemailer, {Transporter} from "nodemailer";
import shortId from "shortid";
import bcrypt, {hash} from "bcrypt";
import * as boardRepository from "../data/board/data.js";
import * as commentRepository from "../data/board/comment.js";
import * as userRepository from "../data/user.js";
import {config} from "../config.js";
import {EmailConfiguration, EmailOption} from "./auth_controller.js";

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

export async function updateInitPassword(req: Request, res: Response) {
    const email: string = String(req.body.email);
    const randomPassword = shortId.generate();
    const emailConfig: EmailConfiguration = {
        service: config.email.emailService,
        auth: {
            user: config.email.emailID,
            pass: config.email.emailPW,
        },
    };
    const transporter: Transporter = await nodemailer.createTransport(emailConfig);
    const mailOptions: EmailOption = {
        from: emailConfig.auth.user,
        to: email,
        subject: "Nogwari 비밀번호 초기화",
        text: `안녕하세요!\n\n 아래에 나오는 비밀번호로 재로그인 부탁드려요! \n\n 비밀번호 : ${randomPassword}`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(400).json({email});
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    const hashed = await bcrypt.hash(randomPassword, config.bcrypt.saltRounds);
    const user = await userRepository.findByRealId(email);
    await userRepository.updatePassword(user!.id, hashed);
    res.sendStatus(200);
}

export async function getPost(req: Request, res: Response) {
    const id = Number(req.userId);
    const data = await boardRepository.getMyPost(id);
    res.status(200).json(data);
}

export async function getComment(req: Request, res: Response) {
    const id = Number(req.userId);
    const data = await commentRepository.getMyComment(id);
    res.status(200).json(data);
}
