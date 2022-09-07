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
}).single('image')


module.exports = upload