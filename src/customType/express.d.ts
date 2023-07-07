import * as express from "express";
import * as redis from "redis";
declare global {
    namespace Express {
        interface Request {
            userId?: number;
            role: string;
            redisClient?: redis;
        }
    }
}
