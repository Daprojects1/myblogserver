const User = require('../../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async (req, res, next) => {
    
    try {
        const { username, password,email } = req.body
    
        if (!username || !password) {
            return res.status(403).json({ message: 'Please provide username and password !' })
        }
    
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: 'Sorry, this username does not exist' })
        
        const isPassMatch = await bcrypt.compare(password, user?.password)
    
        if (!isPassMatch) return res.status(400).json({ message: 'Sorry, password is not valid' })
        
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
        
        const accessToken = jwt.sign(
            { user_id: user._id, username },
             ACCESS_TOKEN_SECRET ,
            {
              expiresIn: "2h",
            })
        const refreshToken =  jwt.sign(
            { user_id: user._id, username },
             REFRESH_TOKEN_SECRET,
            {
              expiresIn: "120s",
            })
        
        user.accessToken = accessToken

        const noPass = () => {
            const {username,_id,email,admin,createdAt,accessToken} = user
            return {username,_id,admin,email,createdAt,accessToken}
        }
        return res.status(200).json({user:noPass()})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }


}

module.exports = loginUser