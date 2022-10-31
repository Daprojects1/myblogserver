const BlogModel = require("../blogModel");

const getAllBlogs = async () => {
  return await BlogModel.find();
};

const createBlog = async (blog) => {
  return await BlogModel.create(blog);
};

const getBlogById = async (id) => {
  return await BlogModel.findById(id);
};

const updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

const deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};

const allUtils = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

module.exports = allUtils;
