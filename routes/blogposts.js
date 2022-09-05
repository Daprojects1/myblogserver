const express = require('express')
const router = express.Router()
const getAllBlogsController = require('../controllers/BlogControllers/getAllBlogsController')
const createBlogController = require('../controllers/BlogControllers/createBlogController')
const updateBlogController = require('../controllers/BlogControllers/updateBlogController')
const deleteBlogController = require('../controllers/BlogControllers/deleteBlogController')
const getBlogByIdController = require('../controllers/BlogControllers/getBlogByIdController')
const auth = require('../middleware/auth') 
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'uploads/')
    },
    filename: function (req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const match = ['image/jpeg', 'img/png']
    if (match.indexOf(file.mimetype) !== -1) {
        cb(null, true)
        return 
    }

    cb(null, false)

}
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter
})

router.route("/")
    .get(getAllBlogsController)
    .post(auth, upload.single('image'), createBlogController)
    
router.route("/:id")
    .get(getBlogByIdController)
    .put(auth,updateBlogController)
    .delete(auth,deleteBlogController)


module.exports = router