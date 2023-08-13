import * as express from "express";
import * as redis from "redis";
import session from "express-session";
declare global {
    namespace Express {
        interface Request {
            userId?: number;
            role: string;
            redisClient?: redis;
            fileName?: string;
            idx?: number;
            boardId?: number;
        }
    }
}

declare module "express-session" {
    interface SessionData {
        viewCount: number[];
    }
}
