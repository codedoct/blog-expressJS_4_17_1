const app = require('express').Router()
const User = require('../../db/models/user')
const errorHandler = require('../../services/error')
const authentication = require('../../services/authentication')
const userTransform = require('../../transformers/user-transform')
const validator = require('../../validators/user')
const bcrypt = require('bcryptjs');

app.post('/register', async (req,res) => {
    try {
        const validate = validator.createUpdateUser.validate(req.body)
        if (validate.error) throw validate.error

        const userExists = await User.findOneByEmail(req.body.email)
        if (userExists) return errorHandler.BadRequest(res, "User email is already exists.")

        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;

            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                req.body.password = hash
                const newUser = new User(req.body)
                const user = await User.createUser(newUser)
                result = userTransform.showUser(user)
        
                res.json({ status: "OK", result })
            });
        });

    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

app.post('/login', async (req,res) => {
    try {
        const user = await User.findOneByEmail(req.body.email)
        if (!user) {
            return errorHandler.BadRequest(res, "Invalid email or password")
        }
        const isMatchUser = await authentication.checkPassword(req.body.password, user)
        if (!isMatchUser) {
            return errorHandler.BadRequest(res, "Password is incorrect")
        }

        const generateToken = authentication.generateToken()
        const updateUser = await User.updateUserNew(user._id, {token: generateToken})
        authentication.redisUpsert(generateToken, updateUser)
        
        const dataToken = `Bearer ${generateToken}`
        const result = userTransform.showUser(updateUser)
        res.json({ status: "OK", token: dataToken, result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

module.exports = app
