const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        console.log('hit')
        const db = req.app.get('db')
        const {username, password} = req.body

        const existingUser = await db.checkForUser(username)

        if(existingUser) {
            const compare = await bcrypt.compareSync(password, existingUser[0].hash)
            if(compare) {
                req.session.userId = existingUser[0].id

                res.status(200).json({
                    id: existingUser[0].id,
                    username: existingUser[0].username,
                    profileImg: existingUser[0].profile_img
                })
            }
        }
    },

    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const existingUser = await db.checkForUser(username)

        if(existingUser[0]) {
            res.status(400).json({message: 'User already exists!'})
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const newUser = await db.createUser(username, hash, `https://robohash.org/${username}`)

            res.session.userid = newUser[0].id

            res.status(200).json({
                id: newUser[0].id,
                username: newUser[0].username,
                profileImg: newUser[0].profile_img
            })
        }
    },

    me: async (req, res) => {
        const db = req.app.get('db')
        const id = req.session.userId

        try {
            const user = await db.checkForUserById(id)

            res.status(200).json({
                id: user[0].id,
                username: user[0].username,
                profileImg: user[0].profile_img
            })
        } catch(err) {
            console.log('Read logged in user', err)
            res.status(500).json({message: 'Could not reload session'})
        }

    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const userId = req.session.userId
        const {search, myPosts} = req.query

        let searchString = `%${search}%`
        let searchUser = myPosts == 'true' ? 0 : userId

        console.log(searchUser, searchString)

        const posts = await db.getPosts(searchUser, searchString)

        res.status(200).json(posts)
    },

    getPost: async (req, res) => {
        const db = req.app.get('db')
        const postId = req.params.id

        const post = await db.getPost(postId)

        res.status(200).json(post[0])
    },

    createPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, img, content} = req.body
        const author = req.session.userId

        const result = await db.createPost(author, title, img, content)
        res.sendStatus(200)
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id

        const result = await db.deletePost(id)

        res.sendStatus(200)
    }
}