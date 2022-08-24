const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    message: {
        type: String,
        required:true
    },
    image: String,
    readTime: String,
    preview: {
        type: String,
    },
    title: {
        type: String,
        required:true
    },
    datePosted: String,
    likes: Number,
    userId: {
        type: String,
        required:true
    },
    comments: [{
        message: String,
        timeCommented: String,
        userName: String,
    }]
})

module.exports = mongoose.model('blogs',BlogSchema)