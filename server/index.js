require('dotenv').config()
const express = require('express')
const massive = require('massive')
const controller = require('./controller')

const app = express()
const {SERVER_PORT, DB_STRING} = process.env

app.use(express.json())

massive(DB_STRING).then(db => {
    app.set('db', db)
    console.log('DB connected')
})

app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)

app.get('/api/posts/:id', controller.getPosts)
app.post('/api/posts', controller.createPost)
app.delete('/api/posts/:id', controller.deletePost)

app.get('/api/post/:id', controller.getPost)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})