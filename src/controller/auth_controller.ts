import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import {NextFunction, Request, Response} from "express";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import nodemailer, {Transporter} from "nodemailer";
import "express-async-errors";
import * as userRepository from "../data/user.js";
import {config} from "../config.js";

type User = {
    id: string;
    password: string;
    nickname: string;
    email: string;
    gread: string;
    img?: string;
    posting_num: number;
    reply_num: number;
    reported: number;
};

type EmailConfiguration = {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
};

type EmailOption = {
    from: string;
    to: string;
    subject: string;
    text: string;
};

export async function signup(req: Request, res: Response) {
    const {password, nickname, email, img} = req.body;
    const found = await userRepository.findByRealId(email);
    if (found) {
        return res.status(409).json({message: `${email} is already exists!`});
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        password: hashed,
        nickname,
        email,
        img,
        grade: "",
        posting_num: 0,
        reply_num: 0,
        reported: 0,
    });
    const token = createJwtToken(userId);
    const expriesInSec = config.jwt.expriesInSec;
    res.status(200).json({token, email, expriesInSec});
}

export async function mailSubmit(req: Request, res: Response) {
    const client = req.redisClient;
    client.connect(); // redis connect 완료
    const {email} = req.body;
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(404).json({email});
        } else {
            console.log("Email sent: " + info.response);
            return res.status(200).json({email});
        }
    });
}

export async function checkVerifyKey(req: Request, res: Response) {
    const client = req.redisClient;
    client.connect(); // redis connect 완료
    const {email, verifyKey} = req.body;
    client.get(`${email}`, (error: any, result: any) => {
        if (error) {
            console.error("Error:", error);
            return res.status(400).json({email, verifyKey});
        } else if (result === null) {
            return res.status(400).json({email, verifyKey});
        } else {
            if (result === verifyKey) {
                return res.status(200).json({email, verifyKey});
            } else {
                return res.status(404).json({email, verifyKey});
            }
        }
    });
}

export async function login(req: Request, res: Response) {
    const {email, password} = req.body;
    const user: any = await userRepository.findByRealId(email);
    if (!user) {
        return res.status(401).json({message: `Invaild user or password`});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({message: `Invaild user or password`});
    }
    const token = createJwtToken(user.id);
    const expriesInSec = config.jwt.expriesInSec;
    const isAdmin = await userRepository.checkAdmin(email);
    if (isAdmin) {
        return res.status(200).json({token, email, expriesInSec, role: "admin"});
    }
    res.status(200).json({token, email, expriesInSec});
}

function createJwtToken(id: string) {
    return jwt.sign({id}, config.jwt.secretKey, {
        expiresIn: config.jwt.expriesInSec,
    });
}

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

export async function me(req: Request, res: Response, next: NextFunction) {
    const id = req.userId;
    const user: any = await userRepository.findById(id!);
    if (!user) {
        return res.status(404).json({message: "User not found!"});
    } else {
        return res.status(200).json({nickname: user.nickname});
    }
}

async function loginToGoogle(profile: any) {
    const found = await userRepository.findByRealId(profile.sub);
    if (!found) {
        // ID가 DB에 없으므로 회원가입
        const hashed = await bcrypt.hash(profile.sub, config.bcrypt.saltRounds); // 비밀번호는 ID를 hash함
        const userId = await userRepository.createUser({
            password: hashed,
            nickname: profile.name,
            email: profile.email,
            img: profile.picture,
            grade: "grade1",
            posting_num: 0,
            reply_num: 0,
            reported: 0,
        });
    }
    const token = createJwtToken(profile.sub);
    return token;
}

passport.use(
    new GoogleStrategy(
        {
            clientID: config.oauth.googleLoginID,
            clientSecret: config.oauth.googleLoginPW,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const token = await loginToGoogle(profile._json);
            const email = profile.id;
            const expriesInSec = config.jwt.expriesInSec;
            return done(null, {email, token, expriesInSec});
        }
    )
);

export default passport;
