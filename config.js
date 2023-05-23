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
};
