const express = require('express')
const session = require('express-session')
const {check} = require('./middlewares/checkForSession')
const sc = require('./controllers/swagController')
const ac = require('./controllers/authController')
const cc = require('./controllers/cartController')
const sec = require('./controllers/searchController')
require('dotenv').config()

const app = express()
const {SERVER_PORT, SESSION_SECRET} = process.env


app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(check)
app.use(express.static(`${__dirname}/../build`))

app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.logout)
app.get('/api/user', ac.getUser)

app.get('/api/swag', sc.read)

app.post('/api/cart/checkout', cc.checkout)
app.post('/api/cart/:id', cc.add)
app.delete('/api/cart/:id', cc.delete)

app.get('/api/search', sec.search)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))