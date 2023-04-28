const express = require("express");
const router = express.Router();

const creatorRoutes = require("./routes/creator.routes");
const userRoutes = require("./routes/user.routes");
router.use("/creator", creatorRoutes);
router.use("/user", userRoutes);

module.exports = router;
