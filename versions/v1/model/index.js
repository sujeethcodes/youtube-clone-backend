const Sequelize = require("sequelize");
const config = require("../config");
const sequelize = new Sequelize(
  config.getConfig().MYSQL_DB,
  config.getConfig().MYSQL_USERNAME,
  config.getConfig().MYSQL_PASSWORD,
  {
    host: config.getConfig().MYSQL_HOST,
    port: config.getConfig().MYSQL_PORT,
    logging: false,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);

let connection;

if (!connection)
  sequelize
    .authenticate()
    .then(() => {
      console.log("DB_RUNNING_SUCCESSFULLY");
      connection = true;
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
