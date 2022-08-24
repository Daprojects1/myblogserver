const express = require('express')
const router = express.Router()
const getAllBlogsController = require('../controllers/BlogControllers/getAllBlogsController')
const createBlogController = require('../controllers/BlogControllers/createBlogController')
const auth = require('../middleware/auth') 
const {
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../model/services/blogModelServices')


router.route("/")
    .get(getAllBlogsController)
    .put(auth,createBlogController)


module.exports = router