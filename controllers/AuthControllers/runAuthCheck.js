const runAuthCheck = (req, res) => {
    if (req.user) return res.status(200).json({ message: 'Success' })
    else return res.status(400).json({message:'Failed'})
}

module.exports = runAuthCheck