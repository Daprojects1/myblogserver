const { deleteBlog } = require('../../model/services/blogModelServices')
const deleteImage = require('../../utils/deleteImage')


const deleteBlogController = async (req,res) => {
    const { id } = req.params

    if (!id) return res.json({ message: 'Sorry, Id is not provided.' })
    
    try {
        const data = await deleteBlog(id)
        res.status(200).json({ message: 'Success !' })
        deleteImage(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
}

module.exports = deleteBlogController