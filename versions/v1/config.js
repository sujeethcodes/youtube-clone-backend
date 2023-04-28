require("dotenv").config();

const environment = process.env.ENVIRONMENT ?? "LOCAL";

const getConfig = () => {
  let config;
  switch (environment) {
    case "LOCAL":
      config = {
        MYSQL_HOST: "localhost",
        MYSQL_USERNAME: "root",
        MYSQL_PASSWORD: "root",
        MYSQL_DB: "youtube",
        MYSQL_PORT: 8889,
        S3_KEY: "",
        S3_SECRET: "",
        S3_BUCKET: "",
        BASE_URL: "",
      };
      break;
    case "STAGE":
      config = {
        MYSQL_HOST: "localhost",
        MYSQL_USERNAME: "root",
        MYSQL_PASSWORD: "root",
        MYSQL_DB: "youtube",
        MYSQL_PORT: 8889,
        S3_KEY: "",
        S3_SECRET: "",
        S3_BUCKET: "",
        BASE_URL: "",
      };
      break;
    case "LIVE":
      config = {
        MYSQL_HOST: "localhost",
        MYSQL_USERNAME: "root",
        MYSQL_PASSWORD: "root",
        MYSQL_DB: "youtube",
        MYSQL_PORT: 8889,
        S3_KEY: "",
        S3_SECRET: "",
        S3_BUCKET: "",
        BASE_URL: "",
      };
      break;
    default:
      break;
  }
  return config;
};
module.exports = {
  environment,
  getConfig,
};
