require('dotenv').config()
require('./config/database')()

const express = require('express')
const cors = require('cors')
const corsOptions = require('./utils/corsOptions')
const app = express()
const blogPosts = require("./routes/blogposts")
const authCheck = require('./routes/auth')
const formData = require("express-form-data");
const os = require("os");

// Routes 
const login = require('./routes/login')
const register = require('./routes/register')



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads'))

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  
  // parse data with connect-multiparty. 
  app.use(formData.parse(options));
  // delete from the request all empty files (size == 0)
  app.use(formData.format());
  // change the file objects to fs.ReadStream 
  app.use(formData.stream());
  // union the body and the files
app.use(formData.union());
  


app.use('/login', login)
app.use('/register', register)
app.use('/posts', blogPosts)
app.use('/auth', authCheck)


// app.get('/',auth, async(req, res) => {
//     res.json({ user:req.user })
// })

app.use(cors(corsOptions))



module.exports = app