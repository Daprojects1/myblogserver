require('dotenv').config()
require('./config/database')()

const express = require('express')
const cors = require('cors')
const corsOptions = require('./utils/corsOptions')
const app = express()
const blogPosts = require("./routes/blogposts")
const auth = require('./middleware/auth')

// Routes 
const login = require('./routes/login')
const register = require('./routes/register')



app.use(express.json())

app.use('/login', login)
app.use('/register', register)
app.use('/posts', blogPosts)

// app.get('/',auth, async(req, res) => {
//     res.json({ user:req.user })
// })

app.use(cors(corsOptions))



module.exports = app