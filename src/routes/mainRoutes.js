const express = require('express')
const jwt = require('jsonwebtoken')
const users = require('../models/users')

const mainRouter = express.Router()

const secretKey = 'u924fnw9eufba9b5'

mainRouter.post('/register', (req, res) => {
    const { username, password, email } = req.body

    const emailExists = users.find(user => user.email === email)

    if (emailExists) return res.status(409).json({ message: 'Email already registered in the database' })

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All parameters are required' })
    }

    if (/(?<=.{2})@(?=.{2,}\..{2})/.test(email) === false) {
        return res.status(400).json({ message: "E-mail invalid" })
    }

    const user = { username, password, email, role: 'standard' }
    users.push(user)

    res.status(201).json({ message: 'User registered successfully', users })
})

mainRouter.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All parameters are required' })
    }

    const user = users.find(user => user.email === email)

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid Credencials' })
    }

    const username = user.username

    const payload = { username }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })

    res.json({ message: 'Login successful', token })
})


module.exports = mainRouter