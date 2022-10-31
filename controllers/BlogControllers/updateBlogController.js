const { updateBlog } = require('../../model/services/blogModelServices')
const BlogModel = require("../../model/blogModel")
const upload = require('../../utils/upload')
const deleteImage = require('../../utils/deleteImage')

const updateBlogController = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({msg:'File extension not valid'})
    }
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            res.status(400).json({message:err?.message})
            return 
        }        
        const {file} = req
        const { id } = req.params
        const { message, title, preview, image: imgText } = { ...req?.body }
                
        if (!id) return res.status(400).json({msg:'ID not included'})
        if (!message && !title && !preview && !file) return res.status(400).json({ msg: 'No changes made !' })
    
        const currentBlog = await BlogModel.findOne({ _id: id })
        
        // check if image has been removed also

        if (!currentBlog) return res.status(404).json({ msg: `blog doesn't exist !` })
    
        const image = file?.path ? file?.path : !imgText ? '' : currentBlog?.image 
        
        try {              
            const blogBody = await updateBlog(id, {
                message, title, preview, image
            })


            if (blogBody?.image && !imgText) {
                deleteImage(currentBlog)
            }

            res.status(200).json({data:blogBody, msg: 'Success !' })
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:'Internal Server Error'})
        }
    })
}


module.exports = updateBlogController