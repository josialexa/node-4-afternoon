const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const {category} = req.query

        if(!category) {
            res.status(200).json(swag)
        } else {
            res.status(200).json(swag.filter(v => v.category == category))
        }
    }
}