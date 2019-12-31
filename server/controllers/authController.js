const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res) => {
        const {username, password} = req.body
        const index = users.findIndex(v => v.username == username && v.password == password)

        if(index != -1) {
            req.session.user.username = username
            res.status(200).json(req.session.user)
        } else {
            res.status(500).json({message: 'Invalid username or password!'})
        }
    },
    register: (req, res) => {
        const {username, password} = req.body
        const newUser = {
            id,
            username,
            password
        }

        users.push(newUser)
        id++

        req.session.user.username = username
        res.status(200).json(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).json(req.session)
    },
    getUser: (req, res) => {
        res.status(200).json(req.session.user)
    }
}