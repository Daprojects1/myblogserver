const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const updateLikesController = require("../controllers/BlogControllers/likeBlogController");

router.route("/:id").post(auth, updateLikesController);

module.exports = router;
