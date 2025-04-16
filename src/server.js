const express = require('express')
const path = require('node:path')
const mainRoute = require('./routes/mainRoute')

const app = express()

app.use(express.json()) 

app.use('/home', mainRoute)


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Servidor inciado em <http://localhost>:${PORT}/`))



