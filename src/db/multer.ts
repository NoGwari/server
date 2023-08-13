import multer from "multer";
import multerS3 from "multer-s3";
import shortId from "shortid";
import {S3Client} from "@aws-sdk/client-s3";
import {config} from "../config.js";

export const upload = multer({
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
            const fileName = `boardId${req.boardId}/imgNum${req.idx}.${type}`;
            cb(null, fileName);
        },
    }),
});
