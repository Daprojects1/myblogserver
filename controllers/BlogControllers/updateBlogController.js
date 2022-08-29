const { updateBlog } = require('../../model/services/blogModelServices')
const BlogModel = require("../../model/blogModel")

const updateBlogController = async (req, res) => {
    const { id } = req.params
    const { message} = req.body
    
    if (!message || !id) return res.status(400).json({ msg: 'No message or ID included !'})

    const currentBlog = await BlogModel.findOne({ id })

    if (!currentBlog) return res.status(404).json({ msg: `blog doesn't exist !` })
    
    try {
        const blogBody = await updateBlog(id, { message })
        
        res.status(200).json({data:blogBody, msg: 'Success !' })
    } catch (error) {
        res.status(500).json({msg:'Internal Server Error'})
    }
}


module.exports = updateBlogController