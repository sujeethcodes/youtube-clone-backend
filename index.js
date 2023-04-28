const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT ?? 9001;
const DB = require("./versions/v1/model/index");
const app = express();
app.use(cors("*"));
app.use(express.json({ limit: "10000000mb" }));
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use("/api", require("./versions/v1/router"));

app.listen(PORT, () => {
  console.log("SERVER_RUNNING");
});

module.exports = app;
