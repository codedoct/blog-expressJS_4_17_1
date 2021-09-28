const app = require('express').Router()
const errorHandler = require('~/services/error')
const userTransform = require('~/transformers/user-transform')
const authentication = require('~/services/authentication')

app.get('/profile', authentication.auth, async (req,res) => {
    try {
        const result = userTransform.showUser(req.user)
        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

module.exports = app
