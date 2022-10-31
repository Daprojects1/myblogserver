const User = require("../../model/model");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getTime = require("../../utils/getTime");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      console.log(username, email, password);
      return res
        .status(400)
        .json({ message: "Please fill in all input fields !" });
    }

    const alreadyExistsName = await User.findOne({ username });
    const alreadyExistsEmail = await User.findOne({ email });

    if (alreadyExistsName || alreadyExistsEmail) {
      return res
        .status(409)
        .json({ message: "User Already Exist. Please Login" });
    }

    const encryptedPass = await bycrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: encryptedPass,
      admin: false,
      createdAt: getTime(),
    });

    const { ACCESS_TOKEN_SECRET } = process.env;
    const token = jwt.sign({ user_id: user._id, email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "2h",
    });

    user.accessToken = token;
    const noPass = async () => {
      const newUser = await User.findOne({ username });
      const { username: newUsername, email, admin, createdAt, _id } = newUser;
      return {
        username: newUsername,
        email,
        admin,
        createdAt,
        _id,
        accessToken,
      };
    };

    res.status(201).json({ user: await noPass(), message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = registerUser;
