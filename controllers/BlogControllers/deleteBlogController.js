const { deleteBlog} = require('../../model/services/blogModelServices')

const deleteBlogController = async (req,res) => {
    const { id } = req.params

    if (!id) return res.json({ message: 'Sorry, Id is not provided.' })
    
    try {
        await deleteBlog(id)
        res.status(200).json({ message:'Success !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
}

module.exports = deleteBlogController