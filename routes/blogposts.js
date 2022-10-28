const express = require("express");
const router = express.Router();
const getAllBlogsController = require("../controllers/BlogControllers/getAllBlogsController");
const createBlogController = require("../controllers/BlogControllers/createBlogController");
const updateBlogController = require("../controllers/BlogControllers/updateBlogController");
const deleteBlogController = require("../controllers/BlogControllers/deleteBlogController");
const getBlogByIdController = require("../controllers/BlogControllers/getBlogByIdController");
const updateLikesController = require("../controllers/BlogControllers/likeBlogController");
const auth = require("../middleware/auth");

router.route("/").get(getAllBlogsController).post(auth, createBlogController);

router
  .route("/:id")
  .get(getBlogByIdController)
  .put(auth, updateBlogController)
  .post(auth, updateLikesController)
  .delete(auth, deleteBlogController);

module.exports = router;
