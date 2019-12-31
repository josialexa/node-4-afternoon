const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const index = req.session.user.cart.findIndex(v => v.id == req.params.id)

        if(index != -1) {
            res.status(200).send(req.session.user)
        } else {
            const swagIndex = swag.findIndex(v => v.id == req.params.id)
            req.session.user.cart.push(swag[swagIndex])
            req.session.user.total += swag[swagIndex].price
            res.status(200).json(req.session.user)
        }
    },
    delete: (req, res) => {
        const {id} = req.params
        const index = req.session.user.cart.findIndex(v => v.id == id)
        req.session.user.total -= req.session.user.cart.splice(index, 1)[0].price
        res.status(200).json(req.session.user)
    },
    checkout: (req, res) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).json(req.session.user)
    }
}