const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId
const { getBlogById } = require("../../model/services/blogModelServices")


const getBlogByIdController = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Please provide needed Id' })
    try {
        // const hex = /[0-9A-Fa-f]{6}/g;
        // if (hex.test(id)) return res.status(400).json({ message: 'Sorry this is not a valid id' })
        const mgId = new mongoose.Types.ObjectId(id.trim())
        if (!mongoose.Types.ObjectId.isValid(mgId)) return res.status(400).json({message:'Sorry, this is not a valid id'})
        const blog = await getBlogById(mgId)
        if (!blog) return res.status(404).json({message:`Sorry, this ID ${id}, does not exist`})
        res.status(200).json({blog,message:'Success !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error !'})
    }
}


module.exports = getBlogByIdController