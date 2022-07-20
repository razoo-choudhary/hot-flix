import * as express from 'express'

const Router = express.Router()

Router.get(  '/', (req, res) => {
    res.status(200).json({
        "status"  : "ok",
        "message" : "Yes API is working"
    })
})

module.exports = Router