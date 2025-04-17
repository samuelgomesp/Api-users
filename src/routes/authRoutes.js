const express = require('express')

const authRouter = express.Router()

authRouter.get('/dashboard', (req, res) => {

    if (!authenticatedUser) {
        return res.status(200).json({ message: 'Welcome to the dashboard Visitor' })
    }

    res.status(200).json({ message: `Welcome to the dashboard ${authenticatedUser}!` })

})

module.exports = authRouter