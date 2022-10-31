const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  image: String,
  readTime: String,
  preview: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  datePosted: String,
  likes: [{}],
  totalLikes: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: String,
  comments: [{}],
});

module.exports = mongoose.model("blogs", BlogSchema);
