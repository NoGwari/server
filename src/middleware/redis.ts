import redis from "redis";
import {Request, Response, NextFunction} from "express";

export const redisMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    const client = await redis.createClient({
        url: redisURL,
        legacyMode: true,
    });
    req.redisClient = client;
    next();
};
