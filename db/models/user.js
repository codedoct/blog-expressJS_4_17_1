const userSchema = require('~/db/schemas/userSchema')
const mongoose = require('mongoose')

const User = mongoose.model('user', userSchema)
User.createUser = (newUser) => {
    return newUser.save()
}

User.findOneByEmail = (data) => {
    return User.findOne({email: data})
}

User.findOneById = (data) => {
    return User.findById(data)
}

User.findOneByToken = (data) => {
    return User.findOne({token: data})
}

User.updateUserNew = (userId, data) => {
    return User.findByIdAndUpdate(userId, data, {new: true});
}

module.exports = User
