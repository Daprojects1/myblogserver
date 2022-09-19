const { createBlog } = require('../../model/services/blogModelServices')
const getTime = require('../../utils/getTime')
const rTime = require('../../utils/readTime')
const upload = require("../../utils/upload")


const createBlogController = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({msg:'File extension not valid'})
    }
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            res.status(400).json({message:err?.message})
            return 
        }
        const { message, title, image, preview } = req.body
        if (!message || !title || !preview) {
            return res.status(400).json({message: 'Please input a blog message, title and preview'})
        }
    
        // going to be recieving html instead that can be displayed. 
        const { user_id,username } = req.user
    
        const mainBlog = {
            message,
            title,
            image:req.file?.path,
            preview,
            readTime: rTime(message),
            datePosted: getTime(),
            likes: 0,
            comments: [],
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


    })

}

module.exports = createBlogController