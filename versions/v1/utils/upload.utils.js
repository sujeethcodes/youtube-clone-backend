const aws = require("aws-sdk");
const { v4: uuid } = require("uuid");

const config = require("../config");
const utils = {};

utils.videoUpload = (folder = "", file, fileType = "VIDEO") => {
  return new Promise(async (resolve, reject) => {
    const s3Config = config.getConfig();
    const s3 = new aws.S3({
      accessKeyId: s3Config.S3_KEY,
      secretAccessKey: s3Config.S3_SECRET,
    });

    const fileNameOnly = uuid() + (fileType === "VIDEO" ? ".mp4" : ".png");

    const fileName = folder + "/" + fileNameOnly;

    const params = {
      Bucket: s3Config.S3_BUCKET,
      Key: fileName,
      Body: file,
      ContentType: fileType === "VIDEO" ? "video/mp4" : "image/png",
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject("");
      } else {
        resolve(fileNameOnly);
      }
    });
  });
};

utils.profileUpload = (folder = "", file, fileType = "IMAGE") => {
  return new Promise(async (resolve, reject) => {
    const s3Config = config.getConfig();
    const s3 = new aws.S3({
      accessKeyId: s3Config.S3_KEY,
      secretAccessKey: s3Config.S3_SECRET,
    });

    const fileNameOnly = uuid() + (fileType === "IMAGE" ? ".png" : ".mp4");

    const fileName = folder + "/" + fileNameOnly;

    const params = {
      Bucket: s3Config.S3_BUCKET,
      Key: fileName,
      Body: file,
      ContentType: fileType === "IMAGE" ? "image/png" : "video/mp4",
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject("");
      } else {
        resolve(fileNameOnly);
      }
    });
  });
};

module.exports = utils;
