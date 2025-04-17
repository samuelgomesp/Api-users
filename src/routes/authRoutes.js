const express = require('express')
const { middlewareDashboard } = require('../middlewares/authMiddlewares')

const authRouter = express.Router()

authRouter.get('/dashboard', middlewareDashboard, (req, res) => {

    if (!req.authenticatedUser) {
        return res.status(200).json({ message: 'Welcome to the dashboard Visitor' })
    }

    res.status(200).json({ message: `Welcome to the dashboard ${req.authenticatedUser.username}!` })

})

module.exports = authRouter