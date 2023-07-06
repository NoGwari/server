import * as express from "express";
import * as redis from "redis";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            role?: string;
            redisClient?: redis;
        }
    }
}
