import dotenv from "dotenv";
dotenv.config();

function required(key, defalutValue = undefined) {
    const value = process.env[key] || defalutValue;
    if (value == null) {
        throw new Error(`key ${key} is undefined!`);
    }
    return value;
}

export const config = {
    port: parseInt(required("PORT", 3000)),
    db: {
        host: required("DB_HOST"),
        user: required("DB_USER"),
        database: required("DB_DATABASE"),
        port: required("DB_PORT"),
        password: required("DB_PASSWORD"),
    },
    cors: {
        allowedOrigin: required("CORS_ALLOW_ORIGIN"),
    },
    jwt: {
        secretKey: required("JWT_SECRET"),
        expriesInSec: parseInt(required("JWT_EXPRIES_SEC", 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
    },
    swagger: {
        host: required("SWAGGER_HOST"),
    },
    aws: {
        accessKey: required("AWS_ACCESS_KEY"),
        secretAccessKey: required("AWS_SECRET_ACCESS_KEY"),
    },
    oauth: {
        googleLoginID: required("GOOGLE_LOGIN_ID"),
        googleLoginPW: required("GOOGLE_LOGIN_PW"),
    },
    email: {
        emailService: required("EMAIL_SERVICE", "Gmail"),
        emailID: required("EMAIL_ID"),
        emailPW: required("EMAIL_PW"),
    },
};
