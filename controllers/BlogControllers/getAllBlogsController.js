const { getAllBlogs} = require('../../model/services/blogModelServices')


const getAllBlogsController = async (req, res, next) => {
    try {
        const posts = await getAllBlogs()
        res.json({blogs:posts, message:'Success !'})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
}


module.exports = getAllBlogsController