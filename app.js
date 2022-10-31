require("dotenv").config();
require("./config/database")();

const express = require("express");
const cors = require("cors");
const corsOptions = require("./utils/corsOptions");
const app = express();
const blogPosts = require("./routes/blogposts");
const authCheck = require("./routes/auth");
const login = require("./routes/login");
const register = require("./routes/register");
const likes = require("./routes/likes");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/login", login);
app.use("/register", register);
app.use("/posts", blogPosts);
app.use("/likes", likes);
app.use("/auth", authCheck);

// app.use(() => (err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         console.log('working')
//         return res.status(418).send(err.code);
//     }
// });

app.use("*", (req, res) => {
  res.status(404).json({ message: "Sorry, route is not available" });
});

module.exports = app;
