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
            const imageFile = [];
            for (let i = 0; req.body[`imageFile${i}`] !== undefined; i++) {
                imageFile.push(req.body[`imageFile${i}`]);
            }
            console.log("body:" + req.body);
            console.log("file:" + req.file);
            console.log("body.jsonData:" + req.body.jsonData);
            console.log("jsonData:" + req.jsonData);
            console.log("imageFile:" + imageFile);
            // const boardId: string = req.params.id;
            const type = file.mimetype.split("/")[1];
            const fileName = `boardId/imgNum.${type}`;
            cb(null, fileName);
        },
    }),
});
