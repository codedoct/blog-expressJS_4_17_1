const app = require('express').Router()
const User = require('../../db/models/user')
const errorHandler = require('../../services/error')
const userTransform = require('../../transformers/user-transform')
const validator = require('../../validators/user')

app.post('/register', async (req,res) => {
    try {
        const validate = validator.createUpdateUser.validate(req.body)
        if (validate.error) throw validate.error

        const userExists = await User.findOneByEmail(req.body.email)
        if (userExists) return errorHandler.BadRequest(res, "User email is already exists.")

        const newUser = new User(req.body)
        const user = await User.createUser(newUser)
        result = userTransform.showUser(user)

        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

module.exports = app
