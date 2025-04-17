const jwt = require('jsonwebtoken')
const users = require('../models/users')

const secretKey = 'u924fnw9eufba9b5'

const middlewareDashboard = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next()
    }

    const token = authHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, secretKey)

    const user = users.find(user => user.username === decodedToken.username)
    
    if (user) {
        req.authenticatedUser = user
    }

    next()

}

const authMiddleware = (req, res, next) => {

}

module.exports = { authMiddleware, middlewareDashboard }