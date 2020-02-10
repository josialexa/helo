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

            res.status(200).json({
                id: newUser[0].id,
                username: newUser[0].username,
                profileImg: newUser[0].profile_img
            })
        }
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const userId = req.params.id
        const {search, myPosts} = req.query

        let searchString = `%${search}%`
        let searchUser = myPosts == 'true' ? 0 : userId

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
        const {author, title, img, content} = req.body

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