import multer from "multer";
import multerS3 from "multer-s3";
import {S3Client} from "@aws-sdk/client-s3";
import {config} from "../config.js";
import shortId from "shortid";

export const uploadPostImg = multer({
    storage: multerS3({
        s3: new S3Client({
            credentials: {
                accessKeyId: config.aws.accessKey,
                secretAccessKey: config.aws.secretAccessKey,
            },
            region: "ap-northeast-2",
        }),
        bucket: "nogwari2",
        acl: "public-read-write",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req: any, file, cb) {
            const type = file.mimetype.split("/")[1];
            const randomFileName = shortId.generate();
            const filePath = `board/${randomFileName}.${type}`; // 저장될 파일 경로와 이름
            cb(null, filePath);
        },
    }),
});

export const uploadUserImg = multer({
    storage: multerS3({
        s3: new S3Client({
            credentials: {
                accessKeyId: config.aws.accessKey,
                secretAccessKey: config.aws.secretAccessKey,
            },
            region: "ap-northeast-2",
        }),
        bucket: "nogwari2",
        acl: "public-read-write",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req: any, file, cb) {
            const type = file.mimetype.split("/")[1];
            const randomFileName = shortId.generate();
            const filePath = `user/${randomFileName}.${type}`; // 저장될 파일 경로와 이름
            cb(null, filePath);
        },
    }),
});
