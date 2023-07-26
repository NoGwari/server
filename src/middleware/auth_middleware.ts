import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import * as userRepository from "../data/user.js";
import {config} from "../config.js";

const AUTH_ERROR = {message: "Authentication Error"};

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(" ")[1]; // 띄어쓰기 후 Bearer걸러낸 다음 문장 넣기.
    jwt.verify(token, config.jwt.secretKey, async (error: any, decoded: any) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        const user: any = await userRepository.findById(decoded.id);
        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }
        req.userId = Number(user.id);
        req.role = user.grade;
        next();
    });
};

export const isAdimin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== "admin") {
        return res.status(401).json(AUTH_ERROR);
    }
    next();
};
