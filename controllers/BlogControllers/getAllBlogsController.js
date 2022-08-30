const { getAllBlogs} = require('../../model/services/blogModelServices')


const getAllBlogsController = async (req, res, next) => {
    try {
        const posts = await getAllBlogs()
        // if (!posts) res.status(404).json({message:'Sorry, posts not available'})
        res.status(200).json({blogs:posts?.reverse(), message:'Success !'})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
}


module.exports = getAllBlogsController