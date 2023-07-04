import jwt from "jsonwebtoken";
import redis from "redis";
import * as userRepository from "../data/user.js";
import {config} from "../config.js";

const AUTH_ERROR = {message: "Authentication Error"};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(" ")[1]; // 띄어쓰기 후 Bearer걸러낸 다음 문장 넣기.
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        const user = await userRepository.findById(decoded.id);
        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }
        req.userId = user.id;
        req.role = user.grade;
        next();
    });
};

export const isAdimin = async (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(401).json(AUTH_ERROR);
    }
    next();
};

export const redisMiddleware = async (req, res, next) => {
    const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    const client = await redis.createClient({
        url: redisURL,
        legacyMode: true,
    });
    req.redisClient = client;
    next();
};
