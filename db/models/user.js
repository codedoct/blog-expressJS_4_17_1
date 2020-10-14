const userSchema = require('../schemas/userSchema')
const mongoose = require('mongoose')

const User = mongoose.model('user', userSchema)
User.createUser = (newUser) => {
    return newUser.save()
}

User.findOneByEmail = (data) => {
    return User.findOne({email: data})
}

module.exports = User
