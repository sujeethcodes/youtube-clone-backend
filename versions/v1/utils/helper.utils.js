const sharp = require("sharp");

const utils = {};
const config = require("../config");

utils.getRandomNumber = (max) => {
  return Math.floor(Math.random() * max * 10000);
};
utils.getPostUrl = (file) => {
  const BASE_URL = config.getConfig().BASE_URL;
  return BASE_URL + file;
};

utils.compressImage = async (buffer, width) => {
  const result = await sharp(buffer)
    .resize({
      width: width,
    })
    .jpeg({
      progressive: true,
    })
    .toBuffer();
  return result;
};
module.exports = utils;
