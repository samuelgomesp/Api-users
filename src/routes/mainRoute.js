const express = require('express')
const jwt = require('jsonwebtoken')
const users = require('../models/users')

const mainRoute = express.Router()


mainRoute.post('/register', (req, res) => {
    const { username, password } = req.body

    console.log(username)

    const userExists = users.find(user => user.username === username)

    if (userExists) res.status(409).json({ message: 'User already exists' })

    if (!username || !password) res.status(400).json({ message: 'Username and password are required' })

    const user = { username, password }
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