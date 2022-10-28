const {
  updateBlog,
  getBlogById,
} = require("../../model/services/blogModelServices");

const getTime = require("../../utils/getTime");
const updateLikesController = async (req, res) => {
  const { id } = req.params;

  const { liked } = req.body;

  if (!id)
    return res.status(400).json({ message: "Sorry, please input an id" });

  const blog = await getBlogById(id);

  if (!blog)
    return res.status(404).json({ message: "Sorry, blog doesn't exist" });

  const { user_id, username } = req.user;

  const { likes } = blog;

  const likeExists = likes.find((like) => like.userId === user_id);

  if (liked === false) {
    if (!likeExists)
      return res
        .status(403)
        .json({ message: "Sorry, you haven't liked this post" });

    const filterLike = [...likes].filter((data) => data.userId !== user_id);
    // const alteredBlog = { ...blog, likes: filterLike };
    const newBlog = await updateBlog(id, { likes: filterLike });
    return res.status(200).json({
      message: "You have succesfully unliked a post",
      blog: newBlog,
    });
  }

  if (liked === true) {
    if (likeExists)
      return res
        .status(403)
        .json({ message: "Sorry, you have already liked this post." });

    const newLikes = [...likes, { userId: user_id, time: getTime() }];
    const newBlog = await updateBlog(id, { likes: newLikes });
    return res.status(202).json({
      message: "You have succesfully liked a post.",
      blog: newBlog,
    });
  }

  return res.status(500).json({ message: "Sorry, something went wrong" });
};

module.exports = updateLikesController;
