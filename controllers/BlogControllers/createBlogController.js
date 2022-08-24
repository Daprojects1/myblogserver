const { createBlog } = require('../../model/services/blogModelServices')
const getTime = require('../../utils/getTime')
const rTime = require('../../utils/readTime')
const getPreview = require('../../utils/getPreview')


const createBlogController = async (req, res) => {
    const { message, title,image } = req.body
    if (!message || !title) {
        return res.status(400).json({message: 'Please input a blog message and title'})
    }

    const mainBlog = {
        message,
        title,
        image,
        readTime: rTime(message),
        datePosted: getTime(),
        likes: 0,
        comments: '',
        preview: getPreview(message),
        // Set userId to logged in user Id. 
        userId:''
    }

    console.log(mainBlog)
    try {
        const blog = await createBlog(mainBlog)
        console.log(blog)
        res.status(201).json({blog, message: 'Success !'})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

module.exports = createBlogController