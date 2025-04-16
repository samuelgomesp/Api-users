const express = require('express')
const jwt = require('jsonwebtoken')
const users = require('../models/users')

const mainRoute = express.Router()


mainRoute.post('/register', (req, res) => {
    const { username, password, email } = req.body

    console.log(username)

    const userExists = users.find(user => user.username === username)

    if (userExists) res.status(409).json({ message: 'User already exists' })

    if (!username || !password || !email) res.status(400).json({ message: 'All parameters are required' })

    if (/(?<=.{2})@(?=.{2,}\..{2})/.test(email) === false) res.status(400).json({ message: "E-mail invalid" })

    const user = { username, password, email, role: 'standard' }
    users.push(user)

    res.status(201).json({ message: 'User registered successfully', users})
})

mainRoute.get('/login', (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username)

    if (!user || user.password !== password) res.status(401).json({ message: 'Invalid Credencials' })

    res.status(200).json({ message: `Welcome ${user.username}` })
})

module.exports = mainRoute