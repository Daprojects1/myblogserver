const { createBlog } = require('../../model/services/blogModelServices')
const getTime = require('../../utils/getTime')
const rTime = require('../../utils/readTime')
const getPreview = require('../../utils/getPreview')


const createBlogController = async (req, res) => {
    
    const { message, title,image } = req.body
    if (!message || !title) {
        return res.status(400).json({message: 'Please input a blog message and title'})
    }

    // going to be recieving html instead that can be displayed. 
    const { user_id,username } = req.user

    const mainBlog = {
        message,
        title,
        image,
        readTime: rTime(message),
        datePosted: getTime(),
        likes: 0,
        comments: [],
        preview: getPreview(message),
        userId: user_id,
        userName:username
    }

    try {
        const blog = await createBlog(mainBlog)
        res.status(201).json({blog, message: 'Success !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

module.exports = createBlogController