import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
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
    const expriesInSec = config.jwt.expriesInSec;
    res.status(200).json({token, realid, expriesInSec});
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
    const expriesInSec = config.jwt.expriesInSec;
    const isAdmin = await userRepository.checkAdmin(realid);
    if (isAdmin) {
        return res.status(200).json({token, realid, expriesInSec, role: "admin"});
    }
    res.status(200).json({token, realid, expriesInSec});
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

async function loginToGoogle(profile) {
    const found = await userRepository.findByRealId(profile.sub);
    if (!found) {
        const hashed = await bcrypt.hash(profile.sub, config.bcrypt.saltRounds);
        const userId = await userRepository.createUser({
            realid: profile.sub,
            password: hashed,
            nickname: profile.name,
            email: profile.email,
            img: profile.picture,
        });
    }
    const token = await createJwtToken(profile.sub);
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
            const realId = profile.id;
            const expriesInSec = config.jwt.expriesInSec;
            return done(null, {realId, token, expriesInSec});
        }
    )
);

export default passport;
