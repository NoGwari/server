import * as AWS from "aws-sdk";
import {config} from "dotenv";

AWS.config.update({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
    region: "us-east-2",
});

const s3 = new AWS.S3();

module.exports = s3;
