const Joi = require('joi');

const joiVaidate = {}
joiVaidate.createUpdateNews = Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().required(),
    status: Joi.number().allow(null)
}).options({ allowUnknown: false })

module.exports = joiVaidate;
