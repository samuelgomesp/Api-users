const express = require('express')
const mainRouter = require('./routes/mainRoutes')
const authRouter = require('./routes/authRoutes')

const app = express()

app.use(express.json()) 

app.use('/test', mainRouter)
app.use('auth', authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Servidor inciado em <http://localhost>:${PORT}/`))



