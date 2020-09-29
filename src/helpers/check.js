const jwt = require('jsonwebtoken')
const check = {}

check.checkPermission = async (req,res,next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(202).json({ auth: false, message: 'No token' })

    const { id } = await jwt.verify(token, process.env.SECRET_WORD)
    req.userID = id
    next()
}

module.exports = check