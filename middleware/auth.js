const jwt = require('jsonwebtoken')
const user = require('../models').user

const checkUserAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const verifiedData = jwt.verify(token, process.env.jwt_secret_key)
        // console.log(verifiedData)
        req.user = verifiedData
        next()
    } catch (error) {
        res.status(400).json({
            message: 'token not valid'
        })
    }
}

module.exports = checkUserAuth