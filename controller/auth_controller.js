import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/user.js";
import {config} from "../config.js";

export async function signup(req, res) {
    const {realid, password, nickname, email, img} = req.body;
    const found = await userRepository.findByRealId(realid);
    if (found) {
        return res.status(409).json({message: `${realid} is already exists!`});
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        realid,
        password: hashed,
        nickname,
        email,
        img,
    });
    const token = createJwtToken(userId);
    res.status(200).json({token, realid});
}

export async function login(req, res) {
    const {realid, password} = req.body;
    const user = await userRepository.findByRealId(realid);
    if (!user) {
        return res.status(401).json({message: `Invaild user or password`});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({message: `Invaild user or password`});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, realid});
}

function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {
        expiresIn: config.jwt.expriesInSec,
    });
}

export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({message: "User not found!"});
    }
    return res.status(200).json({username: user.username});
}
