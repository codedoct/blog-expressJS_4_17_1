const Joi = require('joi');

const joiVaidate = {}
joiVaidate.createUpdateUser = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    gender: Joi.valid('male', 'female').required()
}).options({ allowUnknown: false })

module.exports = joiVaidate;
