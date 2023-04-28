const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

//CONTROLLER
const creatorController = require("../controller/creator.controller");

// ******** ROUTER  ******* //

// CREATOR
router.post(
  "/createCreator",
  upload.single("creatorProfile"),
  creatorController.createCreator
);
router.post("/editCreator", creatorController.editCreator);
router.post("/getCreator", creatorController.getCreator);
router.post("/getAllCreators", creatorController.getAllCreators);
router.post("/deleteCreator", creatorController.deleteCreator);
router.post(
  "/categoriesBasedCreator",
  creatorController.getCategoreisBasedCreator
);
// POST
router.get("/createPost", upload.single("post"), creatorController.createPost);
router.post("/getPost", creatorController.getPost);
router.post("/getAllPost", creatorController.getAllPost);
router.post("/like", creatorController.like);
router.post("/disLike", creatorController.disLike);
router.post("/getLike", creatorController.getLike);

// CHANNEL SUBSCRIBTIONS
router.post("/setSubscribedChannel", creatorController.setSubscribedChannel);
router.post("/subscribedChannel", creatorController.subscribedChannel);

//SHORTS
router.post(
  "/postShorts",
  upload.single("shorts"),
  creatorController.postShorts
);
router.post("/getAllShorts", creatorController.getAllShorts);
router.post(
  "/getShortsViewSubscribedChannel",
  creatorController.getShortsViewSubscribedChannel
);
module.exports = router;
