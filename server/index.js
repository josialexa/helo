require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const controller = require('./controller')

const app = express()
const {SERVER_PORT, DB_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(DB_STRING).then(db => {
    app.set('db', db)
    console.log('DB connected')
})

app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)
app.post('/auth/logout', controller.logout)
app.get('/auth/me', controller.me)

app.get('/api/posts', controller.getPosts)
app.get('/api/posts/:id', controller.getPost)
app.post('/api/posts', controller.createPost)
app.delete('/api/posts/:id', controller.deletePost)


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})