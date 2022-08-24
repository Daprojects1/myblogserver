const User = require('../../model/model')
const bycrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const getTime = require('../../utils/getTime')


const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please fill in all input fields !' })
        }

        const alreadyExistsName = await User.findOne({ username })
        const alreadyExistsEmail = await User.findOne({ email })
        
        if (alreadyExistsName || alreadyExistsEmail) {
            return res.status(409).json({message: "User Already Exist. Please Login"});
        }

        const encryptedPass = await bycrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: encryptedPass,
            admin: false,
            createdAt:getTime()
        })

        const {ACCESS_TOKEN_SECRET} = process.env
        const token = jwt.sign(
            { user_id: user._id, email },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn:'120s'
            }
        )

        user.token = token
        const noPass = () => {
            const newUser = { ...user }
            delete newUser.password
            return newUser
        }
        
        res.status(201).json({ user:noPass() })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports = registerUser