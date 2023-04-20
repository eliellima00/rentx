"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryConfigAWS = void 0;
const aws_sdk_1 = require("aws-sdk");
function factoryConfigAWS() {
    aws_sdk_1.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_BUCKET_REGION,
    });
}
exports.factoryConfigAWS = factoryConfigAWS;
