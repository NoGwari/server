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

export async function mailSubmitForInitPassword(req: Request, res: Response) {
    const client = req.redisClient;
    const {email} = req.body;
    const found = await userRepository.findByRealId(email);
    if (!found) {
        return res.status(404).json({message: `${email} is not exists!`});
    } // email에 해당하는 사용자가 존재하지 않을때,
    await client.connect(); // redis connect 완료
    const verifyKey = Math.floor(Math.random() * 899999) + 100000; // 무작위값 생성
    await req.redisClient.set(`${email}`, `${verifyKey}`, "EX", 300);
    const emailConfig: EmailConfiguration = {
        service: config.email.emailService,
        auth: {
            user: config.email.emailID,
            pass: config.email.emailPW,
        },
    };

    const transporter: Transporter = nodemailer.createTransport(emailConfig);
    const mailOptions: EmailOption = {
        from: emailConfig.auth.user,
        to: email,
        subject: "Nogwari 이메일 인증",
        text: `안녕하세요!\n\n 아래에 나오는 인증번호로 인증 부탁드려요! \n\n 인증번호 : ${verifyKey}`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(404).json({email});
        } else {
            console.log("Email sent: " + info.response);
            return res.status(200).json({email});
        }
    });
}

export async function updateInitPassword(req: Request, res: Response) {
    const {email, verifyKey} = req.body;
    const client = req.redisClient;
    shortId.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@");
    const randomPassword = shortId.generate();
    const hashed = await bcrypt.hash(randomPassword, config.bcrypt.saltRounds);
    const user = await userRepository.findByRealId(email);
    let status: number;
    client.connect(); // redis connect 완료
    client.get(`${email}`, (error: Error, result: any) => {
        if (error) {
            console.error("Error:", error);
            status = 400;
        } else if (result === null) {
            status = 400;
        } else {
            if (result !== verifyKey) {
                status = 404;
            } else {
                userRepository.updatePassword(user!.id, hashed);
                status = 200;
            }
        }
    });
    if (status! === 400) {
        return res.status(400).json({email, verifyKey});
    } else if (status! === 404) {
        return res.status(404).json({email, verifyKey});
    } else {
        return res.status(200).json({email, randomPassword});
    }
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
