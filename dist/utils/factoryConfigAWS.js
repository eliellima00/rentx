"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factoryConfigAWS = factoryConfigAWS;
var _awsSdk = require("aws-sdk");
function factoryConfigAWS() {
  _awsSdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
  });
}